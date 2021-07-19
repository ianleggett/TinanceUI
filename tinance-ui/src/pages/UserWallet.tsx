import type { Web3Provider } from '@ethersproject/providers';
import { formatUnits } from '@ethersproject/units';
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
import { InjectedConnector } from '@web3-react/injected-connector';
import { useMount, useRequest, useUpdateEffect } from 'ahooks';
import { useFormik } from 'formik';
import groupBy from 'lodash-es/groupBy';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import useSWR, { SWRConfig } from 'swr';
import fetcher from 'swr-eth';
import * as yup from 'yup';

import { useAppConfigState } from '../components';
import { Networks, TOKENS_BY_NETWORK } from '../constants';
import { GetNetworkConfigService, GetUserWalletService, SetUserWaletService } from '../services';
import { useEagerConnect, useInactiveListener } from '../utils';

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    Networks.MainNet, // Mainet
    Networks.Ropsten, // Ropsten
    Networks.Rinkeby, // Rinkeby
    Networks.Goerli, // Goerli
    Networks.Kovan, // Kovan
  ],
});

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

const UserWalletPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { ccyCodes } = useAppConfigState();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const direction = useMemo(() => (matches ? 'row' : 'column'), [matches]);
  const [formData, setFormData] = useState(initialValues);
  const [activatingConnector, setActivatingConnector] = useState();
  const [networkConfig, setNetworkConfig] = useState<any>();
  const triedEager = useEagerConnect();
  const { chainId, account, library, activate, active, connector } = useWeb3React<Web3Provider>();

  useInactiveListener(!triedEager || !!activatingConnector);

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
        enqueueSnackbar(res.msg || t('Get user wallet failed'), {
          variant: 'warning',
        });
      }
    },
    onError(error) {
      enqueueSnackbar(error.message || t('Get user wallet failed'), {
        variant: 'warning',
      });
    },
  });

  const { run: setUserWallet, loading } = useRequest(SetUserWaletService, {
    onSuccess(res) {
      if (res.statusCode === 0) {
        getUserWallet();
        enqueueSnackbar(t('Set user wallet successful'), {
          variant: 'success',
        });
      } else {
        enqueueSnackbar(res.msg || t('Set user wallet failed'), {
          variant: 'warning',
        });
      }
    },
    onError(error) {
      enqueueSnackbar(error.message || t('Set user wallet failed'), {
        variant: 'warning',
      });
    },
  });

  const { run: getNetworkConfig } = useRequest(GetNetworkConfigService, {
    onSuccess(res) {
      if (res.statusCode === 0) {
        setNetworkConfig(res);
      } else {
        enqueueSnackbar(res.msg || t('Get network config failed'), {
          variant: 'warning',
        });
      }
    },
    onError(error) {
      enqueueSnackbar(error.message || t('Get network config failed'), {
        variant: 'warning',
      });
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit(values) {
      setUserWallet(values);
    },
  });

  const { symbol, address, decimals } = useMemo(() => {
    return TOKENS_BY_NETWORK[Networks.Kovan][0];
  }, []);

  const { data: balance, mutate } = useSWR([address, 'balanceOf', account]);

  const formattedBalance = useMemo(() => {
    return balance === undefined
      ? `???`
      : Number.parseFloat(formatUnits(balance, decimals)).toPrecision(6);
  }, [balance, decimals]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!loading) {
        formik.handleSubmit();
      }
    },
    [formik, loading],
  );

  const handleGoToUserProfilePage = useCallback(() => {
    history.push('/account/profile');
  }, [history]);

  const handleGoToChangePasswordPage = useCallback(() => {
    history.push('/account/password');
  }, [history]);

  const handleGoToBankDetailsPage = useCallback(() => {
    history.push('/account/bank-details');
  }, [history]);

  const connectWallet = useCallback(() => {
    activate(injectedConnector);
  }, [activate]);

  const disconnectWallet = useCallback(() => {
    injectedConnector.deactivate();
  }, []);

  useMount(() => {
    getUserWallet();
    getNetworkConfig();
  });

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  useUpdateEffect(() => {
    formik.setFieldValue('coinid', formData.coinid);
    formik.setFieldValue('walletAddr', formData.walletAddr);
  }, [formData]);

  injectedConnector.on('connect', (info: { chainId: number }) => {
    // eslint-disable-next-line no-alert
    alert(`Onconnect call here API v1/setwallet( USDT=9, ${account} )`);
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
                <TextField
                  id="balance"
                  name="balance"
                  variant="outlined"
                  label={t('Your Balance')}
                  value={formattedBalance}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid spacing={2} container>
              <Grid xs={12} sm={12} md={4} item>
                {active ? (
                  <SWRConfig
                    value={{
                      fetcher: library ? fetcher(library, new Map(ABIs)) : undefined,
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
                  </SWRConfig>
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
                )}
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
