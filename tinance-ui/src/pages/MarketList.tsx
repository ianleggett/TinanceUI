import { Web3Provider } from '@ethersproject/providers';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import DoubleArrowOutlinedIcon from '@material-ui/icons/DoubleArrowOutlined';
import InboxOutlinedIcon from '@material-ui/icons/InboxOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Rating from '@material-ui/lab/Rating';
import Skeleton from '@material-ui/lab/Skeleton';
import { useWeb3React } from '@web3-react/core';
import { useMount, useRequest, useUnmount } from 'ahooks';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import groupBy from 'lodash-es/groupBy';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { useAppConfigState, useUserManagerState } from '../components';
import { GetAllOffersService, TakeOrderService } from '../services';
import { snackbar, toFixed } from '../utils';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: 16,
  },
  card: {
    padding: 32,
    marginBottom: 16,
    position: 'relative',
  },
  dashed: {
    borderStyle: 'dashed',
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
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const initialValues = {
  fromccyid: 0,
  toccyid: 0,
  fromamt: '',
  payTypes: 0,
};

const MarketListPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const { profile, isLoggedIn } = useUserManagerState();
  const { ccyCodes, paymentTypes, walletConnected } = useAppConfigState();

  const { active, error } = useWeb3React<Web3Provider>(); // ICL added instead of walletconnected

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const direction = useMemo(() => (matches ? 'row' : 'column'), [matches]);

  const [isBuy, setIsBuy] = useState(true);
  const [offers, setOffers] = useState<Offer.Model[]>([]);
  const [currentOrderId, setCurrentOrderId] = useState('');
  const [confirming, setConfirming] = useState(false);

  /** Options of Crypto and Fiat select */
  const options = useMemo(() => {
    return groupBy(
      ccyCodes.filter((v) => v.enable),
      'ccyType',
    );
  }, [ccyCodes]);

  const { run, loading, cancel } = useRequest(GetAllOffersService, {
    onSuccess(res) {
      if (res) {
        setOffers(res);
      }
    },
  });

  const {
    run: createTrade,
    loading: creating,
    cancel: cancelCreate,
  } = useRequest(TakeOrderService, {
    onSuccess(res) {
      if (res.statusCode === 0) {
        history.push('/trades');
        snackbar.success(t('Take over offer successful'));
      } else {
        snackbar.warning(res.msg || t('Take over offer failed'));
      }
    },
  });

  const formik = useFormik({
    initialValues,
    onSubmit(values) {
      const { fromccyid, toccyid, fromamt, payTypes } = values;

      run({
        buy: isBuy,
        sell: !isBuy,
        fromamt: fromamt ? Number.parseInt(fromamt, 10) : undefined,
        fromccyid: fromccyid || undefined,
        toccyid: toccyid || undefined,
        payTypes: payTypes === 0 ? [] : [payTypes],
        status: [],
      });
    },
    onReset() {
      run({
        buy: true,
        sell: false,
      });
    },
  });

  const isBuyer = useCallback(
    (trade: Offer.Model): boolean => {
      if (profile) {
        return (
          (trade.userDetails.cid === profile.cid && trade.buyer) ||
          (trade.userDetails.cid !== profile.cid && !trade.buyer)
        );
      }

      return false;
    },
    [profile],
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      cancelCreate();
      event.preventDefault();

      if (!loading) {
        formik.handleSubmit();
      }
    },
    [cancelCreate, formik, loading],
  );

  const handleReset = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      cancelCreate();
      event.preventDefault();

      if (!loading) {
        formik.resetForm();
      }
    },
    [cancelCreate, formik, loading],
  );

  const handleTakeOverOffer = useCallback(
    (oid: string) => {
      if (!isLoggedIn) {
        history.push('/signin?from=/markets');
        snackbar.warning(t('Please login in first'));
        return;
      }

      if (!active) {
        snackbar.warning(t('Please connect user wallet first'));
        return;
      }

      if (!creating) {
        setCurrentOrderId(oid);
        setConfirming(true);
      }
    },
    [creating, history, isLoggedIn, t, active],
  );

  const handleAccept = useCallback(() => {
    createTrade({
      ordid: currentOrderId,
    });
  }, [createTrade, currentOrderId]);

  const handleReject = useCallback(() => {
    setConfirming(false);
  }, []);

  const handleGoToCreateOfferPage = useCallback(() => {
    history.push('/offers/create');
  }, [history]);

  useMount(() => {
    run({
      buy: true,
      sell: false,
    });
  });

  useUnmount(() => {
    cancel();
  });

  return (
    <Grid container direction={direction} spacing={2} className={classes.container}>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
        <Paper className={classes.paper}>
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <Grid container direction="column" spacing={3}>
              <Grid item xs={12}>
                <ButtonGroup color="secondary" fullWidth>
                  <Button onClick={() => setIsBuy(true)} variant={isBuy ? 'contained' : 'outlined'}>
                    {t('Buy')}
                  </Button>
                  <Button
                    onClick={() => setIsBuy(false)}
                    variant={isBuy ? 'outlined' : 'contained'}
                  >
                    {t('Sell')}
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="fromccyid-select">{t('Crypto')}</InputLabel>
                  <Select
                    id="fromccyid"
                    name="fromccyid"
                    labelId="fromccyid-select"
                    label={t('Crypto')}
                    value={formik.values.fromccyid}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={0}>
                      <em>{t('Any Crypto')}</em>
                    </MenuItem>
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
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="toccyid-select">{t('Fiat')}</InputLabel>
                  <Select
                    id="toccyid"
                    name="toccyid"
                    labelId="toccyid-select"
                    label={t('Fiat')}
                    value={formik.values.toccyid}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={0}>
                      <em>{t('Any Fiat')}</em>
                    </MenuItem>
                    {options.Fiat !== undefined
                      ? options.Fiat.map((fiat) => (
                          <MenuItem key={fiat.id} value={fiat.id}>
                            {fiat.name}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="fromamt"
                  name="fromamt"
                  variant="outlined"
                  label={t('Volume')}
                  placeholder="Volume"
                  inputMode="numeric"
                  value={formik.values.fromamt}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="paytypes-select">{t('Payment')}</InputLabel>
                  <Select
                    id="payTypes"
                    name="payTypes"
                    labelId="paytypes-select"
                    label={t('Payment')}
                    value={formik.values.payTypes}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={0}>
                      <em>{t('Any Payment')}</em>
                    </MenuItem>
                    {paymentTypes
                      .filter((v) => v.enabled)
                      .map((paymentType) => (
                        <MenuItem key={paymentType.id} value={paymentType.id}>
                          {t(paymentType.name)}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Button color="primary" variant="outlined" type="reset" fullWidth>
                      {t('Reset')}
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      startIcon={<SearchOutlinedIcon />}
                      fullWidth
                    >
                      {t('Search')}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
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
              {[1, 2, 3, 4, 5].map((item) => (
                <Grid key={item} xs={6} sm={6} md={3} lg={3} xl={3} item>
                  <Skeleton variant="text" width={50} />
                  <Skeleton variant="rect" width={100} style={{ marginTop: 6 }} />
                </Grid>
              ))}
              <Grid xs={false} sm={false} md={6} lg={6} xl={6} item />
              <Grid xs={12} sm={12} md={3} lg={3} xl={3} item>
                <Skeleton variant="rect" height={36} width="50%" />
              </Grid>
            </Grid>
          </Paper>
        ) : offers.length === 0 ? (
          <Paper className={classes.empty}>
            <InboxOutlinedIcon className={classes.inbox} />
            <Typography variant="body1" color="textSecondary">
              {t('No offer meeting the filter in markets')}
            </Typography>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleGoToCreateOfferPage}
              startIcon={<AddOutlinedIcon />}
              className={classes.button}
            >
              {t('Create new offer')}
            </Button>
          </Paper>
        ) : (
          offers.map((offer) => (
            <Paper key={offer.id} className={classes.card}>
              <Chip
                color="primary"
                variant="outlined"
                label={isBuyer(offer) ? t('Buy') : t('Sell')}
                className={classes.chip}
                style={{ color: '#D97706', borderColor: '#D97706' }}
              />
              <Grid container alignItems="center" spacing={1}>
                <Hidden smUp>
                  <Grid xs={12} style={{ height: 50 }} item />
                </Hidden>
                <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
                  <Typography variant="h5" color="primary" className={classes.title}>
                    {offer.fromccy.name} / {offer.toccy.name}
                  </Typography>
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={12} xl={12} item className={classes.values}>
                  <TextField
                    label={t('Crypto')}
                    variant="outlined"
                    inputMode="decimal"
                    value={offer.fromAmount}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">{offer.fromccy.name}</InputAdornment>
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
                    value={offer.toAmount}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">{offer.toccy.name}</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
                  <Divider className={classes.divider} />
                </Grid>
                <Grid xs={6} sm={6} md={3} lg={3} xl={3} item>
                  <Typography color="textSecondary" variant="overline">
                    {t('Exchange Rate')}
                  </Typography>
                  <Typography color="primary">{toFixed(offer.exchRate, 4)}</Typography>
                </Grid>
                {offer.paymentDetails[0] ? (
                  <Grid xs={6} sm={6} md={3} lg={3} xl={3} item>
                    <Typography color="textSecondary" variant="overline">
                      {t('Payment')}
                    </Typography>
                    <Typography color="primary">
                      {t(offer.paymentDetails[0].payType.name)}
                    </Typography>
                  </Grid>
                ) : null}
                <Grid xs={6} sm={6} md={3} lg={3} xl={3} item>
                  <Typography color="textSecondary" variant="overline">
                    {t('Owner')}
                  </Typography>
                  <Typography color="primary">{offer.userDetails.username}</Typography>
                </Grid>

                <Grid xs={6} sm={6} md={3} lg={3} xl={3} item>
                  <Typography color="textSecondary" variant="overline">
                    {offer.userDetails.ratedCount
                      ? `${t('Rating')} (${offer.userDetails.ratedCount})`
                      : t('Rating')}
                  </Typography>
                  <Box component="div">
                    <Rating size="small" value={offer.userDetails.feedback} readOnly />
                  </Box>
                </Grid>
                <Grid xs={6} sm={6} md={3} lg={3} xl={3} item>
                  <Typography color="textSecondary" variant="overline">
                    {t('Trade Count')}
                  </Typography>
                  <Typography color="primary">
                    {t('0 Trades', {
                      trades: offer.userDetails.tradeCount ?? 0,
                    })}
                  </Typography>
                </Grid>
                <Grid xs={6} sm={6} md={3} lg={3} xl={3} item>
                  <Typography color="textSecondary" variant="overline">
                    {t('Trade Volume')}
                  </Typography>
                  <Typography color="primary">{offer.userDetails.tradeVolume ?? 0}</Typography>
                </Grid>
                <Grid xs={6} sm={6} md={3} lg={3} xl={3} item>
                  <Typography color="textSecondary" variant="overline">
                    {t('Trade Cancel Count')}
                  </Typography>
                  <Typography color="primary">{offer.userDetails.tradeCancelCount ?? 0}</Typography>
                </Grid>
                <Grid xs={6} sm={6} md={3} lg={3} xl={3} item>
                  <Typography color="textSecondary" variant="overline">
                    {t('Average Trade Time')}
                  </Typography>
                  <Typography color="primary">
                    {offer.userDetails.aveTradeTime
                      ? dayjs(offer.userDetails.aveTradeTime).format('YYYY-MM-DD HH:mm')
                      : '-'}
                  </Typography>
                </Grid>
                {confirming && offer.orderId === currentOrderId ? (
                  <>
                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
                      <Divider className={classes.divider} />
                    </Grid>
                    {offer.buyer ? (
                      <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
                        <Typography component="h2" variant="h5" color="primary">
                          You are the buyer, the trading process is:
                        </Typography>
                        <ol>
                          <li>
                            <Typography component="p" variant="body1">
                              You accept this offer
                            </Typography>
                          </li>
                          <li>
                            <Typography component="p" variant="body1">
                              The seller will escrow the USDT
                            </Typography>
                          </li>
                          <li>
                            <Typography component="p" variant="body1">
                              You send money via bank transfer
                            </Typography>
                          </li>
                          <li>
                            <Typography component="p" variant="body1">
                              The seller confirms and release the USDT
                            </Typography>
                          </li>
                          <li>
                            <Typography component="p" variant="body1">
                              We are both happy and trade again in the future
                            </Typography>
                          </li>
                        </ol>
                      </Grid>
                    ) : (
                      <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
                        <Typography component="h2" variant="h5" color="primary">
                          You are the seller, the trading process is:
                        </Typography>
                        <ol>
                          <li>
                            <Typography component="p" variant="body1">
                              You accept this offer
                            </Typography>
                          </li>
                          <li>
                            <Typography component="p" variant="body1">
                              You escrow the USDT
                            </Typography>
                          </li>
                          <li>
                            <Typography component="p" variant="body1">
                              The buyer sends money via bank transfer
                            </Typography>
                          </li>
                          <li>
                            <Typography component="p" variant="body1">
                              You confirm and release the USDT
                            </Typography>
                          </li>
                          <li>
                            <Typography component="p" variant="body1">
                              We are both happy and trade again in the future
                            </Typography>
                          </li>
                        </ol>
                      </Grid>
                    )}
                    <Grid xs={false} sm={false} md={8} lg={8} xl={8} item />
                    <Grid xs={12} sm={12} md={2} lg={2} xl={2} item>
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={handleAccept}
                        startIcon={<CheckOutlinedIcon />}
                        fullWidth
                      >
                        {creating ? t('Creating...') : t('Accept')}
                      </Button>
                    </Grid>
                    <Grid xs={12} sm={12} md={2} lg={2} xl={2} onClick={handleReject} item>
                      <Button
                        color="secondary"
                        variant="outlined"
                        startIcon={<CloseOutlinedIcon />}
                        fullWidth
                      >
                        {t('Reject')}
                      </Button>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid xs={false} sm={false} md={6} lg={6} xl={6} item />
                    <Grid xs={12} sm={12} md={3} lg={3} xl={3} item>
                      <Button
                        color="secondary"
                        variant="outlined"
                        onClick={() => handleTakeOverOffer(offer.orderId)}
                      >
                        {t('Trade')}
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </Paper>
          ))
        )}
      </Grid>
    </Grid>
  );
};

export default MarketListPage;
