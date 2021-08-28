import { Contract } from '@ethersproject/contracts';
import { TransactionResponse, Web3Provider } from '@ethersproject/providers';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DoubleArrowOutlinedIcon from '@material-ui/icons/DoubleArrowOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import InboxOutlinedIcon from '@material-ui/icons/InboxOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Rating from '@material-ui/lab/Rating';
import Skeleton from '@material-ui/lab/Skeleton';
import { useWeb3React } from '@web3-react/core';
import { useMount, useRequest, useUnmount } from 'ahooks';
import dayjs from 'dayjs';
import { BigNumber } from 'ethers';
import { useFormik } from 'formik';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Stomp from 'stompjs';

import pkg from '../../package.json';
import { useAppConfigState, useUserManagerState } from '../components';
import { tradeStatusMap } from '../constants';
import ERC20ABI from '../constants/ERC20.abi.json';
import ESCROWABI from '../constants/ESCROW.abi.json';
import {
  AcceptCancelService,
  CancelTradeService,
  DepositCryptoAsyncService,
  FlagCompleteService,
  FlagFundsSentService,
  GetMyTradesService,
  RateTradeService,
} from '../services';
import { snackbar, toFixed } from '../utils';

const USDT_DECIMALS = 6;
// this comes from swagger API call getnetworkconfig.json
// const ESCROW = '0xB112E084E74720f94f35301B7566C9Cb23993Ea3'; // Our smart contract

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
  markets: {
    marginTop: theme.spacing(2),
  },
  link: {
    display: 'block',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    wordBreak: 'break-all',
    lineHeight: 1.5,
    border: `1px dashed ${theme.palette.primary.light}`,
    borderRadius: 5,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    zIndex: theme.zIndex.tooltip + 1,
  },
  loadingTitle: {
    userSelect: 'none',
    color: theme.palette.common.white,
    marginTop: theme.spacing(2),
  },
  loadingSubtitle: {
    userSelect: 'none',
    color: 'rgba(255, 255, 255, 0.62)',
    marginTop: theme.spacing(1),
  },
}));

const initialValues = {
  status: 'ANY' as Trade.Status | 'ANY',
  keyword: '' as string,
};

const initialValuesForDialog = {
  rating: -1,
  comment: '',
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
  REFUND: 'Seller is being refunded',
  FIATSENT: 'Waiting for the seller to receive Bank funds',
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
  REFUND: 'Your refund is being prepared',
  FIATSENT: 'The buyer has sent bank funds, please check your bank and confirm',
  UNKNOWN: '',
};

const url = new URL('/tradesub', pkg.proxy.replace('http', 'ws'));

const TradeListPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const { profile } = useUserManagerState();
  const { networkConfig } = useAppConfigState();
  const [loading, setLoading] = useState(true);
  const [trades, setTrades] = useState<Trade.Model[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [openRateTradeDialog, setOpenRateTradeDialog] = useState(false);
  const { account, library, connector, error } = useWeb3React<Web3Provider>();
  const stompClientRef = useRef<Stomp.Client | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [depositingMessage, setDepositingMessage] = useState(
    'Depositing - check your wallet for approval',
  );

  const { etherScanPrefix, escrowCtrAddr, USDTCoinCtrAddr } = useMemo(
    () => ({
      etherScanPrefix: networkConfig.etherScanPrefix,
      escrowCtrAddr: networkConfig.escrowCtrAddr,
      USDTCoinCtrAddr: networkConfig.usdtcoinCtrAddr,
    }),
    [networkConfig],
  );

  const { symbol, address, name, decimals, abi } = {
    address: USDTCoinCtrAddr,
    symbol: 'USDT',
    name: 'USDT',
    decimals: 6,
    abi: ERC20ABI,
  };

  const dialogFormikRef = useRef<any>(null);
  const handleRateTradeDialogClose = useCallback(() => {
    setSelectedOrderId('');
    setOpenRateTradeDialog(false);

    if (dialogFormikRef.current) {
      dialogFormikRef.current.resetForm();
      dialogFormikRef.current = null;
    }
  }, []);

  const { run, cancel } = useRequest(GetMyTradesService, {
    pollingWhenHidden: false,
    refreshOnWindowFocus: true,
    pollingInterval: profile && profile.pollingRate ? profile.pollingRate * 1000 : 10_000,
    onSuccess(res) {
      if (res) {
        setTrades(res);
        if (loading) {
          setLoading(false);
        }
      }
    },
    onError() {
      cancel();
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
        snackbar.warning(res.msg || t('Cancel trade failed'));
      }
    },
  });

  const { run: rateTrade, loading: rating } = useRequest(RateTradeService, {
    onSuccess(res) {
      if (res.statusCode === 0) {
        run();
        handleRateTradeDialogClose();
        snackbar.success(t('Thank you for your feedback'));
      } else {
        snackbar.warning(res.msg || t('Rate trade failed'));
      }
    },
  });

  const {
    run: depositCrypto,
    loading: depositing,
    cancel: cancelDeposit,
  } = useRequest(DepositCryptoAsyncService, {
    onSuccess(res) {
      setSelectedOrderId('');

      if (res.statusCode === 0) {
        run();
        snackbar.success(t('Deposit crypto successful'));
      } else {
        snackbar.warning(res.msg || t('Deposit crypto failed'));
      }
    },
  });

  const { run: flagFundsSent, loading: flagging } = useRequest(FlagFundsSentService, {
    onSuccess(res) {
      setSelectedOrderId('');

      if (res.statusCode === 0) {
        run();
        snackbar.success(t('You acknowledged funds have been sent successfully'));
      } else {
        snackbar.warning(res.msg || t('Indicating funds sent - has failed'));
      }
    },
  });

  const { run: flagComplete, loading: flagging2 } = useRequest(FlagCompleteService, {
    onSuccess(res) {
      setSelectedOrderId('');

      if (res.statusCode === 0) {
        run();
        snackbar.success(t('Your trade is successful'));
      } else {
        snackbar.warning(res.msg || t('Indicating trade complete - has failed'));
      }
    },
  });

  const { run: acceptCancel, loading: acceptting } = useRequest(AcceptCancelService, {
    onSuccess(res) {
      setSelectedOrderId('');

      if (res.statusCode === 0) {
        run();
        snackbar.success(t('Accpet cancel successful'));
      } else {
        snackbar.warning(res.msg || t('Accept cancel failed'));
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

  const dialogFormik = useFormik({
    initialValues: initialValuesForDialog,
    onSubmit: (values) => {
      rateTrade({
        ...values,
        tradeid: selectedOrderId,
      });
    },
  });

  const handleRateTradeDialogOpen = useCallback(
    (oid: string) => {
      setSelectedOrderId(oid);
      setOpenRateTradeDialog(true);
      dialogFormikRef.current = dialogFormik;
    },
    [dialogFormik],
  );

  const handleDialogSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!rating) {
        dialogFormik.handleSubmit();
      }
    },
    [dialogFormik, rating],
  );

  const handleDeposit = useCallback(
    (trade) => {
      // (oid: string, amt) => {
      const amt = trade.fromAmount + trade.sellerFee;
      const oid = trade.tradeId;
      // trade.tradeId, trade.fromAmount + trade.sellerFee
      const cryptoAmt = Math.round(amt * 10 ** decimals);

      console.log(`deposit ${amt} ${symbol}`);
      console.log(`units ${cryptoAmt}`);
      console.log(`coin addr ${address}`);
      console.log(`user acct ${account}`);
      console.log(`escrow addr ${escrowCtrAddr}`);

      if (library === undefined) {
        snackbar.warning(t('Please connect wallet'));
        return;
      }

      if (account !== trade.sellerAddress) {
        snackbar.warning(`Wallet has changed !!, switch to wallet ${trade.sellerAddress}`);
        return;
      }

      const stompClient = stompClientRef.current;

      if (stompClient) {
        const subscribtion = stompClient.subscribe(`/topic/messages/${oid}`, (messageOutput) => {
          setShowOverlay(true);

          try {
            const { key, value } = JSON.parse(messageOutput.body);

            setDepositingMessage(value);

            if (key === 'End') {
              stompClient.unsubscribe(subscribtion.id);

              setTimeout(() => {
                setShowOverlay(false);
              }, 1000);
            }
          } catch (error_) {
            console.error(error_.message);
            stompClient.unsubscribe(subscribtion.id);
            setShowOverlay(false);
          }
        });
      }

      // address is address of USDT
      const contract = new Contract(address, ERC20ABI, library.getSigner());

      contract.balanceOf(account).then(
        (bal: BigNumber) => {
          if (bal.lt(cryptoAmt)) {
            snackbar.warning('LOW BALANCE, not enough funds');
            return;
          }
          console.log(`Balance OK ${bal}`);
          // account is user account, what is current user allowance ??
          contract.allowance(account, escrowCtrAddr).then(
            (val: BigNumber) => {
              let txn;

              if (!val.isZero()) {
                if (!val.eq(cryptoAmt)) {
                  snackbar.warning(t(`Allowance reset ( ${val}), please try again !!`));
                  txn = contract.approve(escrowCtrAddr, 0);
                } else {
                  depositCrypto({ oid });
                  setSelectedOrderId(oid);
                }
              } else {
                contract.approve(escrowCtrAddr, cryptoAmt).then(
                  (txnval: TransactionResponse) => {
                    snackbar.success(t('Wallet approval accepted'));
                    // console.log(txnval);
                    // txnval.wait(1).then((txnRec) => {
                    //   console.log('1 block waited');
                    // the escrow contract calls the transfer once deposit() is called
                    // console.log('Here to execute next step');
                    // alert('call here API v1/deposit( ctrid )');
                    depositCrypto({ oid });
                    setSelectedOrderId(oid);
                    // });
                  },
                  (_error: Error) => {
                    // user rejects approval
                    snackbar.warning(_error.message);
                  },
                );
              }
            },
            (_error: Error) => {
              // user rejects approval
              snackbar.warning(_error.message);
            },
          );
        },
        (_error: Error) => {
          console.log(_error);
        },
      );
    },
    [decimals, symbol, address, account, escrowCtrAddr, library, t, depositCrypto],
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

  // const handleCryptoDeposit = useCallback(
  //   (oid: string, amt: BigNumber) => {
  //     cancelDeposit();
  //     depositCrypto({ oid });
  //     setSelectedOrderId(oid);
  //   },
  //   [cancelDeposit, depositCrypto],
  // );

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
      if (library === undefined) {
        console.log('library undefined, return');
        return;
      }
      const thisEscrow = new Contract(escrowCtrAddr, ESCROWABI, library.getSigner());
      const orderIdNumeric = BigInt(`0x${oid}`);
      thisEscrow.releaseEscrow(orderIdNumeric).then((val: TransactionResponse) => {
        // alert(`Success !!! Trade complete ( hex: ${oid} number: ${orderIdNumeric} )`);
        console.log(`txn: ${JSON.stringify(val)}`);
        const txn = val.hash;
        // alert(`txn: ${txn} `);
        flagComplete({ oid, txn });
        setSelectedOrderId(oid);
        cancelCancel();
      });
    },
    [library, escrowCtrAddr, cancelCancel, flagComplete],
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

  const handleGoToMarketListPage = useCallback(() => {
    history.push('/markets');
  }, [history]);

  const handleCopy = useCallback(() => {
    snackbar.success(t('Copied to clipboard!'));
  }, [t]);

  const getPrimaryButton = useCallback(
    (trade: Trade.Model) => {
      const isSeller = !!profile && trade.seller.cid === profile.cid;
      const disableDeposite = depositing && trade.tradeId === selectedOrderId;

      switch (trade.status) {
        case 'CREATED': {
          return isSeller ? (
            <Button
              color="primary"
              variant="contained"
              disabled={disableDeposite}
              onClick={() => handleDeposit(trade)}
            >
              {disableDeposite ? (
                <>
                  <CircularProgress size="1em" />
                  <div>{t('Depositing...')}</div>
                </>
              ) : (
                `${t('Deposit')} ${(trade.fromAmount + trade.sellerFee).toFixed(USDT_DECIMALS)} ${
                  trade.fromccy.name
                }`
              )}
            </Button>
          ) : null;
        }

        case 'DEPOSIT': {
          return isSeller ? null : (
            <Button
              color="primary"
              variant="contained"
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
              color="primary"
              variant="contained"
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

        case 'COMPLETED': {
          if (isSeller && trade.buyerRating !== -1) {
            return (
              <>
                <Typography color="textSecondary" variant="overline">
                  {t('Comment')}
                </Typography>
                <Typography color="primary">{trade.commentAboutBuyer || '-'}</Typography>
              </>
            );
          }

          if (!isSeller && trade.sellerRating !== -1) {
            return (
              <>
                <Typography color="textSecondary" variant="overline">
                  {t('Comment')}
                </Typography>
                <Typography color="primary">{trade.commentAboutSeller || '-'}</Typography>
              </>
            );
          }

          return null;
        }

        default:
          return null;
      }
    },
    [
      depositing,
      flagging,
      flagging2,
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

        case 'COMPLETED': {
          if (isSeller && trade.buyerRating !== -1) {
            return (
              <>
                <Typography color="textSecondary" variant="overline">
                  {t('Rating')}
                </Typography>
                <Typography color="primary">
                  <Rating value={trade.buyerRating} size="small" readOnly />
                </Typography>
              </>
            );
          }

          if (!isSeller && trade.sellerRating !== -1) {
            return (
              <>
                <Typography color="textSecondary" variant="overline">
                  {t('Rating')}
                </Typography>
                <Typography color="primary">
                  <Rating value={trade.sellerRating} size="small" readOnly />
                </Typography>
              </>
            );
          }

          return (
            <Button
              color="primary"
              variant="contained"
              onClick={() => handleRateTradeDialogOpen(trade.tradeId)}
            >
              {t('Rate this trade')}
            </Button>
          );
        }

        default:
          return null;
      }
    },
    [
      acceptting,
      handleAcceptCancel,
      handleRateTradeDialogOpen,
      handleAlertDialogOpen,
      profile,
      selectedOrderId,
      t,
    ],
  );

  useEffect(() => {
    run();

    const websocket = new WebSocket(url.href);
    stompClientRef.current = Stomp.over(websocket);
    const stompClient = stompClientRef.current;

    if (stompClient) {
      stompClient.connect({}, (frame) => console.dir(frame));
    }

    return () => {
      cancel();

      if (stompClient) {
        stompClient.disconnect(() => {
          websocket.close();
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <Button
                variant="outlined"
                color="primary"
                onClick={handleGoToMarketListPage}
                className={classes.markets}
              >
                {t('Go to markets')}
              </Button>
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
                <Grid spacing={1} alignItems="flex-start" container>
                  <Hidden smUp>
                    <Grid xs={12} style={{ height: 50 }} item />
                  </Hidden>
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
                      {dayjs
                        .utc(trade.created, 'YYYY-MM-DD HH:mm:ss.SSS')
                        .local()
                        .format('YYYY-MM-DD HH:mm')}
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                    <Typography color="textSecondary" variant="overline">
                      {t('Expiry Time')}
                    </Typography>
                    <Typography color="primary">
                      {trade.expiry
                        ? dayjs
                            .utc(trade.expiry, 'YYYY-MM-DD HH:mm:ss.SSS')
                            .local()
                            .format('YYYY-MM-DD HH:mm')
                        : '-'}
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                    <Typography color="textSecondary" variant="overline">
                      {t('Remaining Time')}
                    </Typography>
                    <Typography color="primary">
                      {trade.expiry
                        ? dayjs().to(
                            dayjs.utc(trade.expiry, 'YYYY-MM-DD HH:mm:ss.SSS').local(),
                            true,
                          )
                        : '-'}
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
                          <Typography component="span"> (plus </Typography>
                          <Typography component="span" color="primary">
                            {trade.sellerFee.toFixed(USDT_DECIMALS)}
                          </Typography>
                          <Typography component="span"> fees) for </Typography>
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
                          <Typography component="span"> (less </Typography>
                          <Typography component="span" color="primary">
                            {trade.sellerFee.toFixed(USDT_DECIMALS)}
                          </Typography>
                          <Typography component="span"> fees) for </Typography>
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
                  {trade.completedHash || trade.depositHash ? (
                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
                      <Link
                        variant="body1"
                        color="primary"
                        component="a"
                        align="center"
                        target="_blank"
                        href={`${etherScanPrefix}${trade.completedHash || trade.depositHash}`}
                        className={classes.link}
                      >
                        txn:&nbsp;
                        {trade.completedHash || trade.depositHash}
                      </Link>
                    </Grid>
                  ) : null}
                  <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
                    <Typography align="center" color="primary" component="p" variant="h5">
                      {profile && trade.seller.cid === profile.cid
                        ? t(sellerInfo[trade.status])
                        : t(buyerInfo[trade.status])}
                    </Typography>
                  </Grid>
                  {trade.sellerBankDetails ? (
                    <>
                      <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
                        <Divider className={classes.divider} />
                      </Grid>
                      <CopyToClipboard
                        onCopy={handleCopy}
                        text={trade.sellerBankDetails.field1value}
                      >
                        <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                          <Typography color="textSecondary" variant="overline">
                            {t(trade.sellerBankDetails.payType.field1name)}&nbsp;
                            <FileCopyOutlinedIcon fontSize="inherit" />
                          </Typography>
                          <Typography color="primary">
                            {trade.sellerBankDetails.field1value || '-'}
                          </Typography>
                        </Grid>
                      </CopyToClipboard>
                      <CopyToClipboard
                        onCopy={handleCopy}
                        text={trade.sellerBankDetails.field2value}
                      >
                        <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                          <Typography color="textSecondary" variant="overline">
                            {t(trade.sellerBankDetails.payType.field2name)}&nbsp;
                            <FileCopyOutlinedIcon fontSize="inherit" />
                          </Typography>
                          <Typography color="primary">
                            {trade.sellerBankDetails.field2value || '-'}
                          </Typography>
                        </Grid>
                      </CopyToClipboard>
                      <CopyToClipboard
                        onCopy={handleCopy}
                        text={trade.sellerBankDetails.field3value}
                      >
                        <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                          <Typography color="textSecondary" variant="overline">
                            {t(trade.sellerBankDetails.payType.field3name)}&nbsp;
                            <FileCopyOutlinedIcon fontSize="inherit" />
                          </Typography>
                          <Typography color="primary">
                            {trade.sellerBankDetails.field3value || '-'}
                          </Typography>
                        </Grid>
                      </CopyToClipboard>
                      <CopyToClipboard
                        onCopy={handleCopy}
                        text={trade.sellerBankDetails.field4value}
                      >
                        <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                          <Typography color="textSecondary" variant="overline">
                            {t(trade.sellerBankDetails.payType.field4name)}&nbsp;
                            <FileCopyOutlinedIcon fontSize="inherit" />
                          </Typography>
                          <Typography color="primary">
                            {trade.sellerBankDetails.field4value || '-'}
                          </Typography>
                        </Grid>
                      </CopyToClipboard>
                      <CopyToClipboard
                        onCopy={handleCopy}
                        text={trade.sellerBankDetails.field5value}
                      >
                        <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                          <Typography color="textSecondary" variant="overline">
                            {t(trade.sellerBankDetails.payType.field5name)}&nbsp;
                            <FileCopyOutlinedIcon fontSize="inherit" />
                          </Typography>
                          <Typography color="primary">
                            {trade.sellerBankDetails.field5value || '-'}
                          </Typography>
                        </Grid>
                      </CopyToClipboard>
                      <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                        <Typography color="textSecondary" variant="overline">
                          {t('Notes')}
                        </Typography>
                        <Typography color="primary">
                          {trade.sellerBankDetails.usernotes || '-'}
                        </Typography>
                      </Grid>
                    </>
                  ) : null}
                  <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
                    <Divider className={classes.divider} />
                  </Grid>
                </Grid>
                <Grid spacing={1} alignItems="flex-end" container>
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
      <Dialog
        open={openRateTradeDialog}
        onClose={handleRateTradeDialogClose}
        aria-labelledby="rate-trade-dialog-title"
        aria-describedby="rate-trade-dialog-description"
      >
        <form onSubmit={handleDialogSubmit}>
          <DialogTitle id="rate-trade-dialog-title">{t('Rate the trade')}</DialogTitle>
          <DialogContent>
            <Grid spacing={2} justifyContent="center" container>
              <Grid xs={12} item>
                <Rating
                  size="large"
                  value={dialogFormik.values.rating}
                  onChange={(event, value) => {
                    dialogFormik.setFieldValue('rating', value ?? -1);
                  }}
                />
              </Grid>
              <Grid xs={12} item>
                <TextareaAutosize
                  minRows={5}
                  maxRows={10}
                  id="comment"
                  name="comment"
                  placeholder={t('Comment') as string}
                  value={dialogFormik.values.comment}
                  onChange={dialogFormik.handleChange}
                  style={{ width: '100%' }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRateTradeDialogClose} color="default">
              {t('Cancel')}
            </Button>
            <Button type="submit" color="primary" variant="contained" autoFocus>
              {rating ? t('Submitting...') : t('Submit')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Backdrop open={showOverlay} className={classes.backdrop}>
        <Box alignItems="center" justifyContent="center" color="#fff" textAlign="center">
          <CircularProgress color="inherit" />
          <Typography variant="h5" className={classes.loadingTitle}>
            {depositingMessage}
          </Typography>
          <Typography variant="body1" className={classes.loadingSubtitle}>
            {t("Please don't close or refresh the page")}
          </Typography>
        </Box>
      </Backdrop>
    </>
  );
};

export default TradeListPage;
