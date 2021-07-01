import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
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
import DoubleArrowOutlinedIcon from '@material-ui/icons/DoubleArrowOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Rating from '@material-ui/lab/Rating';
import Skeleton from '@material-ui/lab/Skeleton';
import { useMount, useRequest } from 'ahooks';
import { useFormik } from 'formik';
import groupBy from 'lodash-es/groupBy';
import { useCallback, useMemo, useState } from 'react';

import { useAppConfigState } from '../components';
import { GetAllOffersService } from '../services';

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
  },
}));

const initialValues = {
  fromccyid: 0,
  toccyid: 0,
  fromamt: 0,
  payTypes: 0,
};

const MarketListPage: React.FC = () => {
  const classes = useStyles();
  const { ccyCodes, paymentTypes } = useAppConfigState();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const direction = useMemo(() => (matches ? 'row' : 'column'), [matches]);

  const [isBuy, setIsBuy] = useState(true);
  const [offers, setOffers] = useState<Offer.Model[]>([]);

  /** Options of Crypto and Fiat select */
  const options = useMemo(() => {
    return groupBy(
      ccyCodes.filter((v) => v.enable),
      'ccyType',
    );
  }, [ccyCodes]);

  const { run, loading } = useRequest(GetAllOffersService, {
    onSuccess(res) {
      if (res) {
        setOffers(res);
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
        fromamt: fromamt || undefined,
        fromccyid: fromccyid || undefined,
        toccyid: toccyid || undefined,
        payTypes: payTypes === 0 ? undefined : [payTypes],
      });
    },
    onReset() {
      run({
        buy: true,
        sell: false,
      });
    },
  });

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!loading) {
        formik.handleSubmit();
      }
    },
    [formik, loading],
  );

  const handleReset = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!loading) {
        formik.resetForm();
      }
    },
    [formik, loading],
  );

  useMount(run);

  return (
    <Grid container direction={direction} spacing={2} className={classes.container}>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
        <Paper className={classes.paper}>
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <Grid container direction="column" spacing={1}>
              <Grid item xs={12}>
                <ButtonGroup size="small" color="secondary" fullWidth>
                  <Button onClick={() => setIsBuy(true)} variant={isBuy ? 'contained' : 'outlined'}>
                    Buy
                  </Button>
                  <Button
                    onClick={() => setIsBuy(false)}
                    variant={isBuy ? 'outlined' : 'contained'}
                  >
                    Sell
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" margin="dense" fullWidth>
                  <InputLabel id="fromccyid-select">Crypto</InputLabel>
                  <Select
                    id="fromccyid"
                    name="fromccyid"
                    labelId="fromccyid-select"
                    label="Crypto"
                    value={formik.values.fromccyid}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={0}>
                      <em>Any Crypto</em>
                    </MenuItem>
                    {options.Crypto !== undefined
                      ? options.Crypto.map((crypto) => (
                          <MenuItem key={crypto.id} value={crypto.id}>
                            {crypto.name}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" margin="dense" fullWidth>
                  <InputLabel id="toccyid-select">Fiat</InputLabel>
                  <Select
                    id="toccyid"
                    name="toccyid"
                    labelId="toccyid-select"
                    label="Fiat"
                    value={formik.values.toccyid}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={0}>
                      <em>Any Fiat</em>
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
                  type="number"
                  label="Volume"
                  placeholder="Volume"
                  value={formik.values.fromamt}
                  onChange={formik.handleChange}
                  margin="dense"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" margin="dense" fullWidth>
                  <InputLabel id="paytypes-select">Payment</InputLabel>
                  <Select
                    id="payTypes"
                    name="payTypes"
                    labelId="paytypes-select"
                    label="Payment"
                    value={formik.values.payTypes}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={0}>
                      <em>Any Payment</em>
                    </MenuItem>
                    {paymentTypes
                      .filter((v) => v.enabled)
                      .map((paymentType) => (
                        <MenuItem key={paymentType.id} value={paymentType.id}>
                          {paymentType.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Button color="primary" variant="outlined" type="reset" fullWidth>
                      Reset
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
                      Search
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
              {[1, 2, 3, 4].map((item) => (
                <Grid key={item} xs={6} sm={6} md={3} lg={3} xl={3} item>
                  <Skeleton variant="text" width={50} />
                  <Skeleton variant="rect" width={100} style={{ marginTop: 6 }} />
                </Grid>
              ))}
              <Grid xs={false} sm={false} md={10} lg={10} xl={10} item />
              <Grid xs={12} sm={12} md={2} lg={2} xl={2} item>
                <Skeleton variant="rect" height={36} width="100%" />
              </Grid>
            </Grid>
          </Paper>
        ) : (
          offers.map((offer) => (
            <Paper key={offer.id} className={classes.card}>
              <Grid container spacing={1}>
                <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
                  <Typography variant="h5" color="primary" className={classes.title}>
                    {offer.fromccy.name} / {offer.toccy.name}
                  </Typography>
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={12} xl={12} item className={classes.values}>
                  <TextField
                    label="Crypto"
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
                    label="Fiat"
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
                <Grid xs={6} sm={6} md={3} lg={3} xl={3} item>
                  <Typography color="textSecondary" variant="overline">
                    Exchange Rate
                  </Typography>
                  <Typography color="primary">{offer.exchRate}</Typography>
                </Grid>
                {offer.paymentDetails[0] ? (
                  <Grid xs={6} sm={6} md={3} lg={3} xl={3} item>
                    <Typography color="textSecondary" variant="overline">
                      Payment
                    </Typography>
                    <Typography color="primary">{offer.paymentDetails[0].payType.name}</Typography>
                  </Grid>
                ) : null}
                <Grid xs={6} sm={6} md={3} lg={3} xl={3} item>
                  <Typography color="textSecondary" variant="overline">
                    Trader One
                  </Typography>
                  <Typography color="primary">{offer.userDetails.tradecount} Trades</Typography>
                </Grid>
                <Grid xs={6} sm={6} md={3} lg={3} xl={3} item>
                  <Typography color="textSecondary" variant="overline">
                    Rating
                  </Typography>
                  <Box component="div">
                    <Rating size="small" value={offer.userDetails.feedback} readOnly />
                  </Box>
                </Grid>
                <Grid xs={false} sm={false} md={10} lg={10} xl={10} item />
                <Grid xs={12} sm={12} md={2} lg={2} xl={2} item>
                  <Button color="secondary" variant="outlined" fullWidth>
                    Trade
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ))
        )}
      </Grid>
    </Grid>
  );
};

export default MarketListPage;
