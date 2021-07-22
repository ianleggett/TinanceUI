import { Contract } from '@ethersproject/contracts';
import { Web3Provider } from '@ethersproject/providers';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DoubleArrowOutlinedIcon from '@material-ui/icons/DoubleArrowOutlined';
import InboxOutlinedIcon from '@material-ui/icons/InboxOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Skeleton from '@material-ui/lab/Skeleton';
import { useWeb3React } from '@web3-react/core';
import { useMount, useRequest, useUnmount } from 'ahooks';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useUserManagerState } from '../components';
import { Networks, TOKENS_BY_NETWORK, tradeStatusMap } from '../constants';
import ERC20ABI from '../constants/ERC20.abi.json';
import {
  AcceptCancelService,
  CancelTradeService,
  DepositCryptoService,
  FlagCompleteService,
  FlagFundsSentService,
  GetMyTradesService,
} from '../services';
import { toFixed } from '../utils';

const useStyles = makeStyles((theme) => ({
  filter: {
    padding: 16,
    marginTop: 24,
  },
  card: {
    padding: 32,
    marginBottom: 16,
    position: 'relative',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 16,
  },
  divider: {
    marginTop: 24,
    marginBottom: 16,
  },
  values: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    marginLeft: 8,
    marginRight: 8,
    pointerEvents: 'none',
    color: theme.palette.text.hint,
  },
  content: {
    padding: 16,
    fontSize: 16,
    marginTop: 16,
    marginBottom: 16,
    lineHeight: 1.5,
    borderStyle: 'dashed',
  },
  chip: {
    position: 'absolute',
    top: theme.spacing(4),
    left: theme.spacing(4),
    textTransform: 'uppercase',
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
  },
  inbox: {
    width: 150,
    height: 150,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  progress: {
    height: 16,
    marginTop: 4,
    marginBottom: 4,
  },
}));

const initialValues = {
  status: 'ANY' as Trade.Status | 'ANY',
  keyword: '' as string,
};

const buyerInfo: Record<Trade.Status, string> = {
  ARBITRATE: 'Arbitration is in process, please forward evidence to support bank payments',
  CREATED: 'Waiting for seller to deposit crypto funds',
  CANCELLED: 'Trade was cancelled',
  COMPLETED: 'Transfer successful',
  CANCEL_REQ: 'Please send the bank funds',
  ERROR: 'This trade has a process error, we are investigating the issue',
  DEPOSIT:
    'The seller has deposited crypto, please check the transaction and send Fiat bank funds now',
  FIATSENT: 'Waiting for the seller to recieve Bank funds',
  UNKNOWN: '',
};

const sellerInfo: Record<Trade.Status, string> = {
  ARBITRATE: 'Arbitration is in process, please forward evidence to support bank issues',
  CREATED: 'Great, please deposit the crypto funds',
  CANCELLED: 'Trade was cancelled',
  COMPLETED: 'Transfer successful',
  CANCEL_REQ:
    'The buyer is deciding to accept or reject your cancel request. The trade will still occur if the buyer rejects',
  ERROR: 'This trade has a process error, we are investigating the issue',
  DEPOSIT: 'The buyer is sending the bank funds, please check your bank',
  FIATSENT: 'The buyer has sent bank funds, please check your bank and confirm',
  UNKNOWN: '',
};

const TradeListPage: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { profile } = useUserManagerState();
  const { enqueueSnackbar } = useSnackbar();
  const [trades, setTrades] = useState<Trade.Model[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const { account, library } = useWeb3React<Web3Provider>();
  const { symbol, address, decimals } = useMemo(() => {
    return TOKENS_BY_NETWORK[Networks.Kovan][0];
  }, []);

  const { run, loading, cancel } = useRequest(GetMyTradesService, {
    onSuccess(res) {
      if (res) {
        setTrades(res);
      }
    },
  });

  const {
    run: cancelTrade,
    loading: cancelling,
    cancel: cancelCancel,
  } = useRequest(CancelTradeService, {
    onSuccess(res) {
      if (res.statusCode === 0) {
        run();
        setOpenAlertDialog(false);
      } else {
        enqueueSnackbar(res.msg || t('Cancel trade failed'), {
          variant: 'warning',
        });
      }
    },
  });

  const {
    run: depositCrypto,
    loading: depositing,
    cancel: cancelDeposit,
  } = useRequest(DepositCryptoService, {
    onSuccess(res) {
      setSelectedOrderId('');

      if (res.statusCode === 0) {
        run();
        enqueueSnackbar(t('Deposit crypto successful'), {
          variant: 'success',
        });
      } else {
        enqueueSnackbar(res.msg || t('Deposit crypto failed'), {
          variant: 'warning',
        });
      }
    },
  });

  const { run: flagFundsSent, loading: flagging } = useRequest(FlagFundsSentService, {
    onSuccess(res) {
      setSelectedOrderId('');

      if (res.statusCode === 0) {
        run();
        enqueueSnackbar(t('Flag funds sent successful'), {
          variant: 'success',
        });
      } else {
        enqueueSnackbar(res.msg || t('Flag funds sent failed'), {
          variant: 'warning',
        });
      }
    },
  });

  const { run: flagComplete, loading: flagging2 } = useRequest(FlagCompleteService, {
    onSuccess(res) {
      setSelectedOrderId('');

      if (res.statusCode === 0) {
        run();
        enqueueSnackbar(t('Flag complete successful'), {
          variant: 'success',
        });
      } else {
        enqueueSnackbar(res.msg || t('Flag complete failed'), {
          variant: 'warning',
        });
      }
    },
  });

  const { run: acceptCancel, loading: acceptting } = useRequest(AcceptCancelService, {
    onSuccess(res) {
      setSelectedOrderId('');

      if (res.statusCode === 0) {
        run();
        enqueueSnackbar(t('Accpet cancel successful'), {
          variant: 'success',
        });
      } else {
        enqueueSnackbar(res.msg || t('Accept cancel failed'), {
          variant: 'warning',
        });
      }
    },
  });

  const calcExchangeRate = useCallback((fromamt: string, toamt: string): string => {
    const from = fromamt === '' ? 0 : Number.parseInt(fromamt, 10);
    const to = toamt === '' ? 0 : Number.parseInt(toamt, 10);

    if (from !== 0 && to !== 0) {
      return toFixed(to / from, 4);
    }

    return '--';
  }, []);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const { keyword } = values;

      formik.setFieldValue('status', 'ANY');
      run({ keyword });
    },
  });

  const handleStatusSelectChange = useCallback(
    (
      event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
      }>,
    ) => {
      const selectedStatus = event.target.value as Trade.Status | 'ANY';

      formik.handleChange(event);
      formik.setFieldValue('keyword', '');

      run({
        status: selectedStatus === 'ANY' ? [] : [selectedStatus],
      });
    },
    [formik, run],
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!loading) {
        formik.handleSubmit();
      }
    },
    [formik, loading],
  );

  const handleDeposit = useCallback(
    (oid: string, amt) => {
      console.log(`deposit ${amt} ${symbol}`);
      // const { data: balance, mutate } = useSWR([address, 'balanceOf', account]);
      // this comes from swagger API call getnetworkconfig.json
      const ESCROW = address;
      //  '0x618Bb55A032A4334AfBfdd07A297fe2B677B2052';
      if (library === undefined) {
        console.log('library undefined, return');
        return;
      }
      const contract = new Contract(
        '0xd0e03ce5e1917dad909a5b7f03397b055d4ae9c6',
        ERC20ABI,
        library.getSigner(),
      );
      console.log(contract);
      contract.allowance(account, ESCROW).then((val: any) => {
        if (val !== 0) {
          alert(`Allowance was non zero (${val}), it has been reset, try again!!!`);
          contract.approve(ESCROW, 0);
        } else {
          contract.approve(ESCROW, amt).then(() => {
            // the escrow contract calls the transfer once deposit() is called
            console.log('Here to execute next step');
            alert('call here API v1/deposit( ctrid )');
            // setSelectedOrderId(oid);
            // setOpenAlertDialog(true);
          });
        }
      });
    },
    // [library, account],
    [library, account, address, symbol],
  );

  const handleAlertDialogOpen = useCallback((oid: string) => {
    setSelectedOrderId(oid);
    setOpenAlertDialog(true);
  }, []);

  const handleAlertDialogClose = useCallback(() => {
    cancelCancel();
    setSelectedOrderId('');
    setOpenAlertDialog(false);
  }, [cancelCancel]);

  const handleCryptoDeposit = useCallback(
    (oid: string) => {
      cancelDeposit();
      depositCrypto({ oid });
      setSelectedOrderId(oid);
    },
    [cancelDeposit, depositCrypto],
  );

  const handleFlagFundsSent = useCallback(
    (oid: string) => {
      cancelCancel();
      flagFundsSent({ oid });
      setSelectedOrderId(oid);
    },
    [cancelCancel, flagFundsSent],
  );

  const handleFlagComplete = useCallback(
    (oid: string) => {
      cancelCancel();
      flagComplete({ oid });
      setSelectedOrderId(oid);
    },
    [cancelCancel, flagComplete],
  );

  const handleAcceptCancel = useCallback(
    (oid: string) => {
      acceptCancel({ oid });
      setSelectedOrderId(oid);
    },
    [acceptCancel],
  );

  const handleCancelTrade = useCallback(() => {
    if (!cancelling && selectedOrderId) {
      cancelTrade({
        oid: selectedOrderId,
      });
    }
  }, [cancelTrade, cancelling, selectedOrderId]);

  const getPrimaryButton = useCallback(
    (trade: Trade.Model) => {
      const isSeller = !!profile && trade.seller.cid === profile.cid;

      switch (trade.status) {
        case 'CREATED': {
          return isSeller ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDeposit(trade.tradeId, trade.fromAmount)}
            >
              {depositing && trade.tradeId === selectedOrderId
                ? t('Depositing...')
                : `${t('Deposit')} ${toFixed(trade.fromAmount)} ${trade.fromccy.name}`}
            </Button>
          ) : null;
        }

        case 'DEPOSIT': {
          return isSeller ? null : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleFlagFundsSent(trade.tradeId)}
            >
              {flagging && trade.tradeId === selectedOrderId
                ? t('Confirming...')
                : t('I have sent bank funds')}
            </Button>
          );
        }

        case 'FIATSENT': {
          return isSeller ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleFlagComplete(trade.tradeId)}
            >
              {flagging2 && trade.tradeId === selectedOrderId
                ? t('Confirming...')
                : t('I have received bank funds')}
            </Button>
          ) : null;
        }

        case 'CANCEL_REQ': {
          return isSeller ? null : (
            <Button
              color="primary"
              variant="outlined"
              onClick={() => handleFlagFundsSent(trade.tradeId)}
            >
              {flagging && trade.tradeId === selectedOrderId
                ? t('Confirming...')
                : t('I have sent bank funds')}
            </Button>
          );
        }

        default:
          return null;
      }
    },
    [
      depositing,
      flagging,
      flagging2,
      // handleCryptoDeposit,
      handleFlagComplete,
      handleFlagFundsSent,
      profile,
      selectedOrderId,
      t,
      handleDeposit,
    ],
  );

  const getSecondaryButton = useCallback(
    (trade: Trade.Model) => {
      const isSeller = !!profile && trade.seller.cid === profile.cid;

      switch (trade.status) {
        case 'CREATED': {
          return (
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => handleAlertDialogOpen(trade.tradeId)}
            >
              {t('Cancel transaction')}
            </Button>
          );
        }

        case 'DEPOSIT': {
          return (
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => handleAlertDialogOpen(trade.tradeId)}
            >
              {t('Cancel transaction')}
            </Button>
          );
        }

        case 'CANCEL_REQ': {
          return isSeller ? null : (
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => handleAcceptCancel(trade.tradeId)}
            >
              {acceptting && trade.tradeId === selectedOrderId
                ? t('Acceptting...')
                : t('Accept Cancel')}
            </Button>
          );
        }

        default:
          return null;
      }
    },
    [acceptting, handleAcceptCancel, handleAlertDialogOpen, profile, selectedOrderId, t],
  );

  useMount(run);

  useUnmount(() => {
    cancel();
  });

  return (
    <>
      <Grid spacing={2} container>
        <Grid xs={12} item>
          <Paper className={classes.filter}>
            <form onSubmit={handleSubmit}>
              <Grid alignItems="center" spacing={1} container>
                <Grid xs={12} sm={12} md={12} lg={3} xl={3} item />
                <Grid xs={false} sm={false} md={false} lg={3} xl={3} item />
                <Grid xs={12} sm={12} md={12} lg={2} xl={2} item>
                  <FormControl variant="outlined" margin="dense" fullWidth>
                    <InputLabel id="status-select">{t('Status')}</InputLabel>
                    <Select
                      id="status"
                      name="status"
                      labelId="status-select"
                      label="Status"
                      value={formik.values.status}
                      onChange={handleStatusSelectChange}
                    >
                      <MenuItem value="ANY">
                        <em>{t('Any Status')}</em>
                      </MenuItem>
                      {Object.entries(tradeStatusMap).map(([value, label]) => (
                        <MenuItem key={value} value={value}>
                          {label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={2} xl={2} item>
                  <TextField
                    id="keyword"
                    name="keyword"
                    variant="outlined"
                    label={t('Keyword')}
                    placeholder={t('Order or Transaction ID') as string}
                    value={formik.values.keyword}
                    onChange={formik.handleChange}
                    margin="dense"
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={2} xl={2} item>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    startIcon={<SearchOutlinedIcon />}
                    fullWidth
                  >
                    {t('Search')}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        <Grid xs={12} item>
          {loading ? (
            <Paper className={classes.card}>
              <Grid xs={12} sm={12} md={12} lg={12} xl={12} className={classes.title} item>
                <Skeleton variant="rect" width={240} height={32} />
              </Grid>
              <Grid xs={12} sm={12} md={12} lg={12} xl={12} item className={classes.values}>
                <Skeleton variant="rect" width={240} height={56} />
                <Skeleton variant="rect" width={24} height={24} className={classes.arrow} />
                <Skeleton variant="rect" width={240} height={56} />
              </Grid>
              <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
                <Divider className={classes.divider} />
              </Grid>
              <Grid container spacing={1}>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Grid key={item} xs={6} sm={6} md={3} lg={3} xl={3} item>
                    <Skeleton variant="text" width={50} />
                    <Skeleton variant="rect" width={100} style={{ marginTop: 6 }} />
                  </Grid>
                ))}
                <Grid key={7} xs={6} sm={6} md={3} lg={3} xl={3} item>
                  <Skeleton variant="text" width={50} />
                  <Skeleton variant="rect" width="100%" style={{ marginTop: 6 }} />
                </Grid>
              </Grid>
            </Paper>
          ) : trades.length === 0 ? (
            <Paper className={classes.empty}>
              <InboxOutlinedIcon className={classes.inbox} />
              <Typography variant="body1" color="textSecondary">
                {t('No trade meeting the filter')}
              </Typography>
            </Paper>
          ) : (
            trades.map((trade) => (
              <Paper key={trade.id} className={classes.card}>
                {profile && [trade.buyer.cid, trade.seller.cid].includes(profile.cid) ? (
                  <Chip
                    color="primary"
                    variant="outlined"
                    className={classes.chip}
                    label={
                      trade.buyer.cid === profile.cid
                        ? t('You are the Buyer')
                        : t('You are the Seller')
                    }
                    style={{ color: '#D97706', borderColor: '#D97706' }}
                  />
                ) : null}
                <Grid spacing={1} alignItems="flex-end" container>
                  <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
                    <Typography variant="h5" color="primary" className={classes.title}>
                      {trade.fromccy.name} / {trade.toccy.name}
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={12} md={12} lg={12} xl={12} item className={classes.values}>
                    <TextField
                      label={t('Crypto')}
                      variant="outlined"
                      inputMode="decimal"
                      value={trade.fromAmount}
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">{trade.fromccy.name}</InputAdornment>
                        ),
                      }}
                    />
                    <IconButton className={classes.arrow}>
                      <DoubleArrowOutlinedIcon />
                    </IconButton>
                    <TextField
                      label={t('Fiat')}
                      variant="outlined"
                      inputMode="decimal"
                      value={trade.toAmount}
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">{trade.toccy.name}</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
                    <Divider className={classes.divider} />
                  </Grid>
                  <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                    <Typography color="textSecondary" variant="overline">
                      {t('Order ID')}
                    </Typography>
                    <Typography color="primary">{trade.parentOrderId}</Typography>
                  </Grid>
                  <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                    <Typography color="textSecondary" variant="overline">
                      {t('Created Time')}
                    </Typography>
                    <Typography color="primary">
                      {dayjs(trade.created).format('YYYY-MM-DD HH:mm')}
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                    <Typography color="textSecondary" variant="overline">
                      {t('Expiry Time')}
                    </Typography>
                    <Typography color="primary">{dayjs().format('YYYY-MM-DD HH:mm')}</Typography>
                  </Grid>
                  <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                    <Typography color="textSecondary" variant="overline">
                      {t('Remaining Time')}
                    </Typography>
                    <Typography color="primary">
                      {dayjs().to(dayjs('2021-07-08 20:20'), true)}
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
                    <Divider className={classes.divider} />
                  </Grid>
                  <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
                    <Typography align="center" component="p" variant="body1">
                      {profile && trade.seller.cid === profile.cid ? (
                        <>
                          <Typography component="span">You are selling </Typography>
                          <Typography component="span" color="primary">
                            {toFixed(trade.fromAmount)} {trade.fromccy.name}
                          </Typography>
                          <Typography component="span"> for </Typography>
                          <Typography component="span" color="primary">
                            {toFixed(trade.toAmount)} {trade.toccy.name}
                          </Typography>
                          <Typography component="span"> at an exchange rate of </Typography>
                          <Typography component="span" color="primary">
                            {calcExchangeRate(
                              trade.fromAmount.toString(),
                              trade.toAmount.toString(),
                            )}
                          </Typography>
                          <Typography component="span"> to Buyer </Typography>
                          <Typography component="span" color="primary">
                            {trade.buyer.username}
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Typography component="span">You are buying </Typography>
                          <Typography component="span" color="primary">
                            <code>{toFixed(trade.fromAmount)}</code> {trade.fromccy.name}
                          </Typography>
                          <Typography component="span"> for </Typography>
                          <Typography component="span" color="primary">
                            <code>{toFixed(trade.toAmount)}</code> {trade.toccy.name}
                          </Typography>
                          <Typography component="span"> at an exchange rate of </Typography>
                          <Typography component="span" color="primary">
                            <code>
                              {calcExchangeRate(
                                trade.fromAmount.toString(),
                                trade.toAmount.toString(),
                              )}
                            </code>
                          </Typography>
                          <Typography component="span"> to Seller </Typography>
                          <Typography component="span" color="primary">
                            {trade.seller.username}
                          </Typography>
                        </>
                      )}
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
                    <Typography align="center" color="primary" component="p" variant="h5">
                      {profile && trade.seller.cid === profile.cid
                        ? t(sellerInfo[trade.status])
                        : t(buyerInfo[trade.status])}
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
                    <Divider className={classes.divider} />
                  </Grid>
                  <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                    <Typography color="textSecondary" variant="overline">
                      {t('Offer Accepted')}
                    </Typography>
                    <Typography color="primary">{dayjs().to(dayjs(trade.created))}</Typography>
                  </Grid>
                  <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                    <Typography color="textSecondary" variant="overline">
                      {t('Status')}
                    </Typography>
                    <Typography color="primary">{trade.status}</Typography>
                  </Grid>
                  <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                    {getSecondaryButton(trade)}
                  </Grid>
                  <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                    {getPrimaryButton(trade)}
                  </Grid>
                </Grid>
              </Paper>
            ))
          )}
        </Grid>
      </Grid>
      <Dialog
        open={openAlertDialog}
        onClose={handleAlertDialogClose}
        aria-labelledby="cancel-dialog-title"
        aria-describedby="cancel-dialog-description"
      >
        <DialogTitle id="cancel-dialog-title">
          {t('Are you sure to cancel this transaction?')}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleAlertDialogClose} color="primary">
            {t('Cancel')}
          </Button>
          <Button color="secondary" variant="contained" onClick={handleCancelTrade} autoFocus>
            {cancelling ? t('Confirming...') : t('Confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TradeListPage;
