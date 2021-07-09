import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import DoubleArrowOutlinedIcon from '@material-ui/icons/DoubleArrowOutlined';
import InboxOutlinedIcon from '@material-ui/icons/InboxOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Skeleton from '@material-ui/lab/Skeleton';
import { useMount, useRequest, useUnmount } from 'ahooks';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { offerStatusMap } from '../constants';
import { GetMyOffersService } from '../services';

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
  status: 'ANY' as Offer.Status | 'ANY',
  keyword: '' as string,
};

const OfferListPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const [offers, setOffers] = useState<Offer.Model[]>([]);

  const { run, loading, cancel } = useRequest(GetMyOffersService, {
    onSuccess(res) {
      if (res) {
        setOffers(res);
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

  const handleGoToCreateOfferPage = useCallback(() => {
    history.push('/offers/create');
  }, [history]);

  useMount(run);

  useUnmount(() => {
    cancel();
  });

  return (
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
              <Chip
                color="primary"
                variant="outlined"
                label={offer.buyer ? t('Sell') : t('Buy')}
                className={classes.chip}
                style={{ color: '#D97706', borderColor: '#D97706' }}
              />
              <Grid container spacing={1}>
                <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
                  <Typography variant="h5" color="primary" className={classes.title}>
                    {offer.fromccy.name} / {offer.toccy.name}
                  </Typography>
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={12} xl={12} item className={classes.values}>
                  <TextField
                    label={t('Crypto')}
                    variant="outlined"
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
                    {dayjs(offer.created).format('YYYY-MM-DD HH:mm')}
                  </Typography>
                </Grid>
                <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                  <Typography color="textSecondary" variant="overline">
                    {t('Expiry Time')}
                  </Typography>
                  <Typography color="primary">
                    {dayjs(offer.expiry).format('YYYY-MM-DD HH:mm')}
                  </Typography>
                </Grid>
                <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                  <Typography color="textSecondary" variant="overline">
                    {t('Remaining Time')}
                  </Typography>
                  <Typography color="primary">{dayjs().to(dayjs(offer.expiry), true)}</Typography>
                </Grid>
                <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                  <Typography color="textSecondary" variant="overline">
                    {t('Exchange Rate')}
                  </Typography>
                  <Typography color="primary">{offer.exchRate.toFixed(4)}</Typography>
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
              </Grid>
            </Paper>
          ))
        )}
      </Grid>
    </Grid>
  );
};

export default OfferListPage;
