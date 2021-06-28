import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Skeleton from '@material-ui/lab/Skeleton';
import { useMount, useRequest } from 'ahooks';
import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
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
  },
  content: {
    padding: 16,
    fontSize: 16,
    marginTop: 16,
    marginBottom: 16,
    lineHeight: 1.5,
    borderStyle: 'dashed',
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
  const [offers, setOffers] = useState<Offer.Model[]>([]);

  const { run, loading } = useRequest(GetMyOffersService, {
    onSuccess(res) {
      if (res) {
        setOffers(res);
      }
    },
  });

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const { status, keyword } = values;

      if (keyword) {
        run({ keyword });
        formik.setFieldValue('status', 'ANY');
      } else if (status === 'ANY') {
        run();
      } else {
        run({ status: [status] });
      }
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

  const handleGoToCreateOfferPage = useCallback(() => {
    history.push('/offers/create');
  }, [history]);

  useMount(run);

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
                  Create New Offer
                </Button>
              </Grid>
              <Grid xs={false} sm={false} md={false} lg={3} xl={3} item />
              <Grid xs={12} sm={12} md={12} lg={2} xl={2} item>
                <FormControl variant="outlined" margin="dense" fullWidth>
                  <InputLabel id="status-select">Status</InputLabel>
                  <Select
                    id="status"
                    name="status"
                    labelId="status-select"
                    label="Status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="ANY">
                      <em>Any Status</em>
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
                  label="Keyword"
                  placeholder="Order or Trasaction ID"
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
                  Search
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>

      <Grid xs={12} item>
        {loading ? (
          <Paper className={classes.card}>
            <Grid container spacing={1}>
              {[1, 2, 3, 4].map((item) => (
                <Grid key={item} xs={12} sm={6} md={3} lg={3} xl={3} item>
                  <Skeleton variant="text" width={60} />
                  <Skeleton variant="rect" width={120} style={{ marginTop: 4 }} />
                </Grid>
              ))}
              <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
                <Skeleton variant="rect" height={50} style={{ marginTop: 16, marginBottom: 16 }} />
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={6} xl={6} item>
                <Skeleton variant="text" width={60} />
                <Skeleton variant="rect" width={120} style={{ marginTop: 4 }} />
              </Grid>
              <Grid xs={12} sm={6} md={6} lg={6} xl={6} item>
                <Skeleton variant="text" width={60} />
                <Skeleton variant="rect" width="100%" style={{ marginTop: 4 }} />
              </Grid>
            </Grid>
          </Paper>
        ) : (
          offers.map((offer) => (
            <Paper key={offer.id} className={classes.card}>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                  <Typography color="textSecondary" variant="overline">
                    Order ID
                  </Typography>
                  <Typography color="primary">979ugeagae</Typography>
                </Grid>
                <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                  <Typography color="textSecondary" variant="overline">
                    Created Time
                  </Typography>
                  <Typography color="primary">2021-06-21 4pm</Typography>
                </Grid>
                <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                  <Typography color="textSecondary" variant="overline">
                    Expiry Time
                  </Typography>
                  <Typography color="primary">2021-06-21 8pm</Typography>
                </Grid>
                <Grid xs={12} sm={6} md={3} lg={3} xl={3} item>
                  <Typography color="textSecondary" variant="overline">
                    Ramaining Time
                  </Typography>
                  <Typography color="primary">4 Hours</Typography>
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
                  <Paper variant="outlined" className={classes.content}>
                    You are selling 1000 USDT for 3600000 VND at an exchange rate of 3600
                  </Paper>
                </Grid>
                <Grid xs={12} sm={6} md={6} lg={6} xl={6} item>
                  <Typography color="textSecondary" variant="overline">
                    Status
                  </Typography>
                  <Typography color="primary">In Progress</Typography>
                </Grid>
                <Grid xs={12} sm={6} md={6} lg={6} xl={6} item>
                  <Typography color="textSecondary" variant="overline">
                    Progress
                  </Typography>
                  <LinearProgress variant="determinate" value={50} className={classes.progress} />
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
