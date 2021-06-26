import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Rating from '@material-ui/lab/Rating';
import Skeleton from '@material-ui/lab/Skeleton';
import { useMount, useRequest } from 'ahooks';
import groupBy from 'lodash-es/groupBy';
import { useMemo, useState } from 'react';

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
  trade: {
    marginTop: 16,
  },
}));

const MarketListPage: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { ccyCodes, paymentTypes } = useAppConfigState();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const direction = useMemo(() => (matches ? 'row' : 'column'), [matches]);
  const [marketType, setMarketType] = useState<'Buy' | 'Sell'>('Buy');
  const [offers, setOffers] = useState<Offer.Model[]>([]);

  /** Options of Crypto and Fiat select */
  const options = useMemo(() => {
    return groupBy(ccyCodes, 'ccyType');
  }, [ccyCodes]);

  const { run, loading } = useRequest(GetAllOffersService, {
    onSuccess(res) {
      if (res) {
        setOffers(res);
      }
    },
  });

  useMount(run);

  return (
    <Grid container direction={direction} spacing={2} className={classes.container}>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
        <Paper className={classes.paper}>
          <Grid container direction="column" spacing={1}>
            <Grid item xs={12}>
              <ButtonGroup color="secondary" fullWidth>
                <Button
                  onClick={() => setMarketType('Buy')}
                  variant={marketType === 'Buy' ? 'contained' : 'outlined'}
                >
                  Buy
                </Button>
                <Button
                  onClick={() => setMarketType('Sell')}
                  variant={marketType === 'Sell' ? 'contained' : 'outlined'}
                >
                  Sell
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" margin="normal" fullWidth>
                <InputLabel id="crypto-select">Crypto</InputLabel>
                <Select
                  id="crypto-select"
                  labelId="crypto-select"
                  name="crypto-select"
                  label="Crypto"
                  value={0}
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
              <FormControl variant="outlined" margin="normal" fullWidth>
                <InputLabel id="fiat-select">Fiat</InputLabel>
                <Select
                  id="fiat-select"
                  labelId="fiat-select"
                  name="fiat-select"
                  label="Fiat"
                  value={0}
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
                id="volume-input"
                name="volume-input"
                label="Volume"
                variant="outlined"
                placeholder="Volume"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" margin="normal" fullWidth>
                <InputLabel id="payment-select">Payment</InputLabel>
                <Select
                  id="payment-select"
                  labelId="payment-select"
                  name="payment-select"
                  label="Payment"
                  value={0}
                >
                  <MenuItem value={0}>
                    <em>Any Payment</em>
                  </MenuItem>
                  {paymentTypes.map((paymentType) => (
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
        </Paper>
      </Grid>

      <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
        {loading ? (
          <Paper className={classes.card}>
            <Grid container spacing={1}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <Grid key={item} xs={6} sm={6} md={3} lg={3} xl={3} item>
                  <Skeleton variant="text" width={50} />
                  <Skeleton variant="rect" width={100} style={{ marginTop: 4 }} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        ) : (
          offers.map((offer) => (
            <Paper key={offer.id} className={classes.card}>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                  <Typography color="textSecondary" variant="overline">
                    Crypto
                  </Typography>
                  <Typography color="primary">USDT</Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                  <Typography color="textSecondary" variant="overline">
                    Fiat
                  </Typography>
                  <Typography color="primary">VND</Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                  <Typography color="textSecondary" variant="overline">
                    Volume
                  </Typography>
                  <Typography color="primary">10000</Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                  <Typography color="textSecondary" variant="overline">
                    Exchange Rate
                  </Typography>
                  <Typography color="primary">3600</Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                  <Typography color="textSecondary" variant="overline">
                    Trader One
                  </Typography>
                  <Typography color="primary">1000 trades</Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={3} xl={3}>
                  <Typography color="textSecondary" variant="overline">
                    Rating
                  </Typography>
                  <Box>
                    <Rating value={2.5} precision={0.5} size="small" readOnly />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} />
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <Button
                    color="secondary"
                    variant="outlined"
                    size="small"
                    className={classes.trade}
                    fullWidth
                  >
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
