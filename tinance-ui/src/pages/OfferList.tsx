import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import DeleteOutlineRounded from '@material-ui/icons/DeleteOutlineRounded';
import DoubleArrowOutlinedIcon from '@material-ui/icons/DoubleArrowOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import InboxOutlinedIcon from '@material-ui/icons/InboxOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import Skeleton from '@material-ui/lab/Skeleton';
import { useMount, useRequest, useSessionStorageState, useUnmount } from 'ahooks';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { useUserManagerState } from '../components';
import { offerStatusMap } from '../constants';
import { GetMyOffersService, InviteTradeService, ToggleOfferLiveService } from '../services';
import { DeleteOfferService } from '../services/delete-offer';
import { snackbar, toFixed } from '../utils';

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
  topRight: {
    position: 'absolute',
    top: theme.spacing(4),
    right: theme.spacing(4),
    textTransform: 'uppercase',
  },
  share: {
    marginBottom: theme.spacing(1),
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
  status: 'ANY' as Offer.Status | 'ANY',
  keyword: '' as string,
};

const OfferListPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const { profile } = useUserManagerState();
  const [offers, setOffers] = useState<Offer.Model[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<string>('');
  const [, setCachedOffer] = useSessionStorageState<Offer.Model>('current_offer');
  const [showShareDialog, setShowShareDialog] = useState(false);

  const { run, loading, cancel } = useRequest(GetMyOffersService, {
    onSuccess(res) {
      if (res) {
        setOffers(res);
      }
    },
  });

  const { run: toggleLive, loading: toggling } = useRequest(ToggleOfferLiveService, {
    onSuccess(res) {
      if (res.statusCode === 0) {
        setOffers((prevState) =>
          prevState.map((offer) => {
            if (offer.orderId === selectedOffer) {
              offer.live = !offer.live;
            }
            return offer;
          }),
        );
        setSelectedOffer('');
        snackbar.success(t('Toggle live successful'));
      } else {
        snackbar.warning(t('Toggle live failed'));
      }
    },
  });

  const { run: deleteOffer, loading: relist } = useRequest(DeleteOfferService, {
    onSuccess(res) {
      if (res.statusCode === 0) {
        setSelectedOffer('');
        snackbar.success(t('Offer delete successful'));
      } else {
        snackbar.warning(t('Offer delete failed'));
      }
    },
  });

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const { keyword } = values;

      formik.setFieldValue('status', 'ANY');
      run({ keyword });
    },
  });

  const { run: inviteTrade, loading: sending } = useRequest(InviteTradeService, {
    onSuccess(res) {
      if (res.statusCode === 0) {
        setSelectedOffer('');
        setShowShareDialog(false);
        snackbar.success(t('Invite trade successful'));
        run();
      } else {
        snackbar.warning(t('Invite trade failed'));
      }
    },
    onError() {
      snackbar.warning(t('Invite trade failed'));
    },
  });

  const shareForm = useFormik({
    initialValues: {
      emailuser: '',
    },
    validationSchema: yup.object({
      emailuser: yup
        .string()
        .required(t('Email address is Required'))
        .email(t('Invalid email adrress format')),
    }),
    onSubmit: (values) => {
      inviteTrade({
        offerid: selectedOffer,
        ...values,
      });
    },
  });

  const handleShareDialogOpen = useCallback((oid: string) => {
    setSelectedOffer(oid);
    setShowShareDialog(true);
  }, []);

  const handleShareDialogClose = useCallback(() => {
    setSelectedOffer('');
    setShowShareDialog(false);
  }, []);

  const handleShareFormSubmit = useCallback(() => {
    if (!sending) {
      shareForm.handleSubmit();
    }
  }, [shareForm, sending]);

  const isBuyer = useCallback(
    (trade: Offer.Model): boolean => {
      if (profile) {
        return (
          (trade.userDetails.cid === profile.cid && trade.buyer) ||
          (trade.userDetails.cid !== profile.cid && !trade.buyer)
        );
      }
      return true;
    },
    [profile],
  );

  const handleStatusSelectChange = useCallback(
    (
      event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
      }>,
    ) => {
      const selectedStatus = event.target.value as Offer.Status | 'ANY';

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

  const handleToggleLive = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean, oid: string) => {
      if (!toggling) {
        setSelectedOffer(oid);
        toggleLive({ oid, v: checked });
      }
    },
    [toggleLive, toggling],
  );

  const handleDeleteOffer = useCallback(
    (oid: string) => {
      setSelectedOffer(oid);
      deleteOffer({ oid });
    },
    [deleteOffer],
  );

  const handleEditOffer = useCallback(
    (offer: Offer.Model) => {
      setCachedOffer(offer);
      setTimeout(() => {
        history.push(`/offers/update/${offer.orderId}`);
      }, 100);
    },
    [history, setCachedOffer],
  );

  const handleGoToCreateOfferPage = useCallback(() => {
    history.push('/offers/create');
  }, [history]);

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
                <Grid xs={12} sm={12} md={12} lg={3} xl={3} item>
                  <Button
                    color="secondary"
                    variant="contained"
                    startIcon={<AddOutlinedIcon />}
                    onClick={handleGoToCreateOfferPage}
                  >
                    {t('Create new offer')}
                  </Button>
                </Grid>
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
                      {Object.entries(offerStatusMap).map(([value, label]) => (
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
          ) : offers.length === 0 ? (
            <Paper className={classes.empty}>
              <InboxOutlinedIcon className={classes.inbox} />
              <Typography variant="body1" color="textSecondary">
                {t('No offer meeting the filter')}
              </Typography>
            </Paper>
          ) : (
            offers.map((offer) => (
              <Paper key={offer.id} className={classes.card}>
                {profile ? (
                  <Chip
                    color="primary"
                    variant="outlined"
                    label={isBuyer(offer) ? t('Buy') : t('Sell')}
                    className={classes.chip}
                    style={{ color: '#D97706', borderColor: '#D97706' }}
                  />
                ) : null}
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-end"
                  className={classes.topRight}
                >
                  {offer.procStatus === 'CREATED' ? (
                    offer.invited && offer.invited.length > 0 ? (
                      <Typography
                        color="primary"
                        variant="overline"
                        style={{ textTransform: 'initial' }}
                      >
                        {t('Invited', {
                          email: offer.invited[0].email,
                        })}
                      </Typography>
                    ) : (
                      <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        startIcon={<ShareOutlinedIcon />}
                        className={classes.share}
                        onClick={() => handleShareDialogOpen(offer.orderId)}
                      >
                        {t('Share')}
                      </Button>
                    )
                  ) : null}
                  <Tooltip
                    title={(offer.live ? t('Active') : t('Inactive')) as string}
                    placement="top"
                    arrow
                  >
                    <Switch
                      color="primary"
                      checked={offer.live}
                      onChange={(event, checked) => handleToggleLive(event, checked, offer.orderId)}
                    />
                  </Tooltip>
                </Box>
                <Grid container alignItems="flex-end" spacing={1}>
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

                  <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                    <Typography color="textSecondary" variant="overline">
                      {t('Order ID')}
                    </Typography>
                    <Typography color="primary">{offer.orderId}</Typography>
                  </Grid>
                  <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                    <Typography color="textSecondary" variant="overline">
                      {t('Created Time')}
                    </Typography>
                    <Typography color="primary">
                      {dayjs
                        .utc(offer.created, 'YYYY-MM-DD HH:mm:ss.SSS')
                        .local()
                        .format('YYYY-MM-DD HH:mm')}
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                    <Typography color="textSecondary" variant="overline">
                      {t('Expiry Time')}
                    </Typography>
                    <Typography color="primary">
                      {dayjs
                        .utc(offer.expiry, 'YYYY-MM-DD HH:mm:ss.SSS')
                        .local()
                        .format('YYYY-MM-DD HH:mm')}
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                    <Typography color="textSecondary" variant="overline">
                      {t('Remaining Time')}
                    </Typography>
                    <Typography color="primary">
                      {dayjs().isAfter(dayjs.utc(offer.expiry, 'YYYY-MM-DD HH:mm:ss.SSS').local())
                        ? '-'
                        : dayjs().to(
                            dayjs.utc(offer.expiry, 'YYYY-MM-DD HH:mm:ss.SSS').local(),
                            true,
                          )}
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                    <Typography color="textSecondary" variant="overline">
                      {t('Exchange Rate')}
                    </Typography>
                    <Typography color="primary">{toFixed(offer.exchRate, 4)}</Typography>
                  </Grid>
                  <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                    <Typography color="textSecondary" variant="overline">
                      {t('Status')}
                    </Typography>
                    <Typography
                      color={
                        ['CANCELLED', 'EXPIRED', 'DELETED'].includes(offer.procStatus)
                          ? 'secondary'
                          : 'primary'
                      }
                    >
                      {offer.procStatus}
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                    <Typography color="textSecondary" variant="overline">
                      {t('Progress')}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={((offer.fromAmount - offer.remainCryptoAmt) / offer.fromAmount) * 100}
                      className={classes.progress}
                    />
                  </Grid>
                  {new Set(['CREATED', 'EXPIRED']).has(offer.procStatus) ? (
                    <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEditOffer(offer)}
                        startIcon={<EditOutlinedIcon />}
                      >
                        {t('Edit Offer')}
                      </Button>
                      &nbsp;
                      <Button
                        disabled={offer.live}
                        color="secondary"
                        onClick={() => handleDeleteOffer(offer.orderId)}
                        startIcon={<DeleteOutlineRounded />}
                      />
                    </Grid>
                  ) : null}
                </Grid>
              </Paper>
            ))
          )}
        </Grid>
      </Grid>
      <Dialog
        open={showShareDialog}
        onClose={handleShareDialogClose}
        aria-labelledby="share-dialog-title"
      >
        <DialogTitle id="share-dialog-title">{t('Invite Trade')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('Type in the email to share this offer with your friend')}
          </DialogContentText>
          <TextField
            id="emailuser"
            name="emailuser"
            margin="dense"
            disabled={sending}
            label={t('Email Address')}
            value={shareForm.values.emailuser}
            onChange={shareForm.handleChange}
            error={shareForm.touched.emailuser && Boolean(shareForm.errors.emailuser)}
            helperText={shareForm.touched.emailuser && shareForm.errors.emailuser}
            autoFocus
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleShareDialogClose} color="primary">
            {t('Cancel')}
          </Button>
          <Button onClick={handleShareFormSubmit} color="primary">
            {t(sending ? 'Submitting...' : 'Submit')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OfferListPage;
