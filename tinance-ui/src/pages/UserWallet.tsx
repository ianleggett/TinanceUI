import { BigNumber } from '@ethersproject/bignumber';
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers';
import { formatUnits } from '@ethersproject/units';
import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { useWeb3React } from '@web3-react/core';
import { useMount, useRequest, useUpdateEffect } from 'ahooks';
import useEtherSWR, { EtherSWRConfig } from 'ether-swr';
import { useFormik } from 'formik';
import groupBy from 'lodash-es/groupBy';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { useAppConfig } from '../components';
import { Networks, TOKENS_BY_NETWORK } from '../constants';
import ERC20ABI from '../constants/ERC20.abi.json';
import { GetNetworkConfigService, GetUserWalletService, SetUserWaletService } from '../services';
import { injectedConnector, walletconnect, walletlink } from '../utils/connectors';
import { useEagerConnect } from '../utils/hooks';
import { snackbar } from '../utils/snackbar';

const mymap = new Map<string, any>([['0xd0e03ce5e1917dad909a5b7f03397b055d4ae9c6', ERC20ABI]]);

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  active: {
    color: theme.palette.primary.main,
  },
  card: {
    padding: 32,
    marginBottom: 16,
    position: 'relative',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  form: {
    'display': 'flex',
    'flexDirection': 'column',
    'marginTop': theme.spacing(4),
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  userid: {
    display: 'none',
  },
}));

const initialValues = {
  coinid: 9,
  walletAddr: '',
};

export const TokenBalance = ({
  symbol,
  address,
  decimals,
  account,
}: {
  symbol: string;
  address: string;
  decimals: number;
  account: string | null | undefined;
}): JSX.Element => {
  const { data: balance, mutate } = useEtherSWR([address, 'balanceOf', account]);

  if (!balance) {
    return <div>...</div>;
  }

  return (
    <div>
      Balance : {Number.parseFloat(formatUnits(balance, decimals))} {symbol}
    </div>
  );
};

const WalletConnection: React.FC = () => {
  const { connector, library, chainId, account, activate, deactivate, active, error } =
    useWeb3React<Web3Provider>();
  const [activatingConnector, setActivatingConnector] = React.useState<any>();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect();

  const [{ ccyCodes }, dispatch] = useAppConfig();
  // Set global state `walletConnected` in app context to true
  const handleWalletConnect = useCallback(() => {
    dispatch({
      type: 'update',
      payload: {
        walletConnected: true,
      },
    });
  }, [dispatch]);

  // Set global state `walletConnected` in app context to false
  const handleWalletDisconnect = useCallback(() => {
    dispatch({
      type: 'update',
      payload: {
        walletConnected: false,
      },
    });
  }, [dispatch]);

  enum ConnectorNames {
    Injected = 'Injected',
    // Network = 'Network',
    WalletConnect = 'WalletConnect',
    WalletLink = 'WalletLink',
    // Ledger = 'Ledger',
    // Trezor = 'Trezor',
    // Lattice = 'Lattice',
    // Frame = 'Frame',
    // Authereum = 'Authereum',
    // Fortmatic = 'Fortmatic',
    // Magic = 'Magic',
    // Portis = 'Portis',
    // Torus = 'Torus'
  }

  const connectorsByName: { [connectorName in ConnectorNames]: any } = {
    [ConnectorNames.Injected]: injectedConnector,
    // [ConnectorNames.Network]: network,
    [ConnectorNames.WalletConnect]: walletconnect,
    [ConnectorNames.WalletLink]: walletlink,
    // [ConnectorNames.Ledger]: ledger,
    // [ConnectorNames.Trezor]: trezor,
    // [ConnectorNames.Lattice]: lattice,
    // [ConnectorNames.Frame]: frame,
    // [ConnectorNames.Authereum]: authereum,
    // [ConnectorNames.Fortmatic]: fortmatic,
    // [ConnectorNames.Magic]: magic,
    // [ConnectorNames.Portis]: portis,
    // [ConnectorNames.Torus]: torus
  };
  return (
    <>
      {!active &&
        Object.entries(connectorsByName).map((ky, i) => {
          const currentConnector = ky[1];
          const activating = currentConnector === activatingConnector;
          const connected = currentConnector === connector;
          const disabled = !triedEager || !!activatingConnector || connected || !!error;
          return (
            <Button
              color="primary"
              variant="outlined"
              size="large"
              disabled={disabled}
              // key={ky}
              onClick={() => {
                setActivatingConnector(currentConnector);
                activate(currentConnector);
                handleWalletConnect();
              }}
            >
              {activating && <CircularProgress />}
              {/* {connected && (
                <span role="img" aria-label="check">
                  ✅
                </span>
              )} */}
              {ky[0]}
            </Button>
          );
        })}
      {(active || error) && (
        <Button
          color="secondary"
          variant="outlined"
          size="large"
          onClick={() => {
            deactivate();
            handleWalletDisconnect();
          }}
        >
          Disconnect
        </Button>
      )}
    </>
  );
};

const UserWalletPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const [{ ccyCodes }, dispatch] = useAppConfig();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const direction = useMemo(() => (matches ? 'row' : 'column'), [matches]);
  const [formData, setFormData] = useState(initialValues);
  const [activatingConnector, setActivatingConnector] = useState();
  const [networkConfig, setNetworkConfig] = useState<any>();

  const { connector, library, chainId, account, activate, deactivate, active } =
    useWeb3React<Web3Provider>();

  const ABIs = useMemo(() => {
    return (chainId ? TOKENS_BY_NETWORK[chainId] : []).map<[string, any]>(({ address, abi }) => [
      address,
      abi,
    ]);
  }, [chainId]);

  /** Options of Crypto and Fiat select */
  const options = useMemo(() => {
    return groupBy(
      ccyCodes.filter((v) => v.enable),
      'ccyType',
    );
  }, [ccyCodes]);

  const validationSchema = useCallback(() => {
    return yup.lazy((values: typeof initialValues) =>
      yup.object({
        coinid: yup.number().required(t('Coin ID is required')),
        walletAddr: yup.string().required(t('Wallet address is required')),
      }),
    );
  }, [t]);

  const { run: getUserWallet } = useRequest(GetUserWalletService, {
    onSuccess(res) {
      if (res.coinid) {
        setFormData(res);
      } else {
        snackbar.warning(res.msg || t('Get user wallet failed'));
      }
    },
    onError(error) {
      snackbar.warning(error.message || t('Get user wallet failed'));
    },
  });

  const { run: setUserWallet, loading } = useRequest(SetUserWaletService, {
    onSuccess(res) {
      if (res.statusCode === 0) {
        getUserWallet();
        snackbar.success(t('Set user wallet successful'));
      } else {
        snackbar.warning(res.msg || t('Set user wallet failed'));
      }
    },
    onError(error) {
      snackbar.warning(error.message || t('Set user wallet failed'));
    },
  });

  const { run: getNetworkConfig } = useRequest(GetNetworkConfigService, {
    onSuccess(res) {
      if (res) {
        setNetworkConfig(res);
      } else {
        snackbar.warning(t('Get network config failed'));
      }
    },
    onError(error) {
      snackbar.warning(error.message || t('Get network config failed'));
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit(values) {
      setUserWallet(values);
    },
  });

  useEffect(() => {
    if (account !== undefined && account !== null) {
      setUserWallet({ coinid: 9, walletAddr: account });
    }
  }, [active, account, setUserWallet]);

  const { symbol, address, decimals } = useMemo(() => {
    return TOKENS_BY_NETWORK[Networks.Kovan][0];
  }, []);

  console.log(active);
  console.log(`ADDR ${address} `);
  console.log(`ACCT: ${account} `);
  console.log(`ACCT: ${library?.getSigner} `);
  //  console.log(`BAL: ${balance} `);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!loading) {
        formik.handleSubmit();
      }
    },
    [formik, loading],
  );

  useUpdateEffect(() => {
    formik.setFieldValue('coinid', formData.coinid);
    formik.setFieldValue('walletAddr', formData.walletAddr);
  }, [formData]);

  const handleGoToUserProfilePage = useCallback(() => {
    history.push('/account/profile');
  }, [history]);

  const handleGoToChangePasswordPage = useCallback(() => {
    history.push('/account/password');
  }, [history]);

  const handleGoToBankDetailsPage = useCallback(() => {
    history.push('/account/bank-details');
  }, [history]);

  // const connectWallet = useCallback(() => {
  //   activate(injectedConnector);
  //   handleWalletConnect(); // ICL quick fix to make work for testing
  // }, [activate, handleWalletConnect]);

  // const disconnectWallet = useCallback(() => {
  //   injectedConnector.deactivate();
  //   deactivate();
  //   handleWalletDisconnect(); // ICL quick fix to make work for testing
  // }, [deactivate, handleWalletDisconnect]);

  useMount(() => {
    getUserWallet();
    getNetworkConfig();
  });

  return (
    <Grid container direction={direction} spacing={2} className={classes.container}>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
        <Paper>
          <List component="nav" aria-label={t('User Center')}>
            <ListItem onClick={handleGoToUserProfilePage} button>
              <ListItemIcon>
                <PersonOutlineIcon />
              </ListItemIcon>
              <ListItemText primary={t('User Profile')} />
            </ListItem>
            <ListItem className={classes.active} button>
              <ListItemIcon>
                <AccountBalanceWalletOutlinedIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={t('User Wallet')} />
            </ListItem>
            <ListItem onClick={handleGoToBankDetailsPage} button>
              <ListItemIcon>
                <AccountBalanceOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={t('Bank Details')} />
            </ListItem>
            <ListItem onClick={handleGoToChangePasswordPage} button>
              <ListItemIcon>
                <LockOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={t('Change Password')} />
            </ListItem>
          </List>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
        <Paper className={classes.card}>
          <Typography component="h2" variant="h3" color="primary" className={classes.title}>
            {t('User Wallet')}
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <Grid spacing={2} container>
              <Grid xs={12} sm={12} md={4} item>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="coinid-select">{t('User Wallet')}</InputLabel>
                  <Select
                    id="coinid"
                    name="coinid"
                    labelId="coinid-select"
                    label={t('User Wallet')}
                    value={formik.values.coinid}
                    onChange={formik.handleChange}
                  >
                    {options.ERC20 !== undefined
                      ? options.ERC20.map((erc20) => (
                          <MenuItem key={erc20.id} value={erc20.id}>
                            {erc20.name}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12} sm={12} md={8} item>
                <TextField
                  id="walletAddr"
                  name="walletAddr"
                  variant="outlined"
                  label={t('Wallet Address')}
                  value={formik.values.walletAddr}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} sm={12} md={12} item>
                <EtherSWRConfig
                  value={{
                    provider: library,
                    ABIs: new Map(mymap),
                    refreshInterval: 30_000,
                  }}
                >
                  {active && <TokenBalance {...{ symbol, address, decimals, account }} />}
                </EtherSWRConfig>
              </Grid>
            </Grid>
            <Grid spacing={2} container>
              <Grid xs={12} sm={12} md={4} item>
                {/* {active ? (
                  <EtherSWRConfig
                    value={{
                      provider: library,
                      ABIs: new Map(mymap),
                      refreshInterval: 30_000,
                    }}
                  >
                    <Button
                      color="primary"
                      variant="outlined"
                      size="large"
                      onClick={disconnectWallet}
                    >
                      {t('Disconnect')}
                    </Button>
                  </EtherSWRConfig>
                ) : (
                  <Button
                    color="primary"
                    variant="outlined"
                    size="large"
                    onClick={connectWallet}
                    fullWidth
                  >
                    {t('Connect')}
                  </Button>
                )} */}
                <WalletConnection />
              </Grid>
              <Grid xs={12} sm={12} md={8} item>
                <Button type="submit" color="primary" variant="contained" size="large" fullWidth>
                  {loading ? t('Updating...') : t('Update User Wallet')}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserWalletPage;
