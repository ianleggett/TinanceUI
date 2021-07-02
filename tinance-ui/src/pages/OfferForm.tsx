import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import SwapHorizOutlinedIcon from '@material-ui/icons/SwapHorizOutlined';
import Alert from '@material-ui/lab/Alert';
import { DatePicker } from '@material-ui/pickers';
import type { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { useRequest } from 'ahooks';
import { useFormik } from 'formik';
import groupBy from 'lodash-es/groupBy';
import { useSnackbar } from 'notistack';
import { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAppConfigState } from '../components';
import { AddUpdateOrderService } from '../services';

const useStyles = makeStyles((theme) => ({
  step: {
    padding: 16,
    marginTop: 24,
  },
  card: {
    marginTop: 24,
  },
  arrow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  main: {
    marginTop: 32,
    marginBottom: 32,
  },
  actions: {
    position: 'relative',
    height: 54,
  },
  left: {
    position: 'absolute',
    left: 8,
  },
  right: {
    position: 'absolute',
    right: 8,
  },
  picker: {
    marginTop: 24,
    marginBottom: 16,
  },
}));

interface InitialValues {
  fromccyid: number;
  fromamt: number;
  toccyid: number;
  toamt: number;
  expiry: string;
  usingDefault: boolean;
  payDetail: {
    payTypeId: number;
    field1name: string; // Bank Name
    field2name: string; // Sort Code
    field3name: string; // Account Number
    field4name: string; // IBAN
    field5name: string; // Country
  };
}

const initialValues: InitialValues = {
  fromccyid: 0,
  fromamt: 0,
  toccyid: 0,
  toamt: 0,
  expiry: '',
  usingDefault: true,
  payDetail: {
    payTypeId: 0,
    field1name: '',
    field2name: '',
    field3name: '',
    field4name: '',
    field5name: '',
  },
};

const steps = ['Offer Details', 'Payment Details', 'Expiry Time'];

const OfferFormPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { ccyCodes } = useAppConfigState();
  const [activeStep, setActiveStep] = useState(0);

  /** Options of Crypto and Fiat select */
  const options = useMemo(() => {
    return groupBy(
      ccyCodes.filter((v) => v.enable),
      'ccyType',
    );
  }, [ccyCodes]);

  const { run, loading } = useRequest(AddUpdateOrderService, {
    onSuccess(res) {
      history.push('/offers');
      enqueueSnackbar('New offer created successful', {
        variant: 'success',
      });
    },
  });

  const formik = useFormik({
    initialValues,
    onSubmit(values) {
      const { usingDefault, payDetail, ...restValues } = values;

      if (usingDefault) {
        run(restValues);
      } else {
        run({ payDetail, ...restValues });
      }
    },
  });

  const handlePrev = useCallback(() => {
    setActiveStep((prevState) => Math.max(prevState - 1, 0));
  }, []);

  const handleNext = useCallback(() => {
    setActiveStep((prevState) => Math.min(prevState + 1, 2));
  }, []);

  const handleDatePickerChange = useCallback(
    (date: MaterialUiPickersDate) => {
      formik.handleChange(date ? date.format('YYYY-MM-DD') : '');
    },
    [formik],
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

  return (
    <form onSubmit={handleSubmit}>
      <Grid spacing={2} container>
        <Grid xs={12} item>
          <Paper className={classes.step}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const completed = index <= activeStep;

                return (
                  <Step key={label} completed={completed}>
                    <StepLabel>
                      <Typography variant="button" color={completed ? 'primary' : undefined}>
                        {label}
                      </Typography>
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Paper>
        </Grid>
        {activeStep === 0 ? (
          <Grid xs={12} item>
            <Card className={classes.card}>
              <CardContent>
                <Typography
                  component="h2"
                  variant="h4"
                  color="textPrimary"
                  className={classes.title}
                >
                  Create an offer
                </Typography>

                <Grid spacing={2} className={classes.main} container>
                  <Grid xs={false} sm={false} md={false} lg={1} xl={1} item />
                  <Grid xs={4} item>
                    <Grid spacing={2} container>
                      <Grid xs={12} sm={12} md={12} lg={5} xl={5} item>
                        <FormControl variant="outlined" fullWidth>
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
                              <em>Select Crypto</em>
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
                      <Grid xs={12} sm={12} md={12} lg={7} xl={7} item>
                        <TextField
                          id="fromamt"
                          name="fromamt"
                          variant="outlined"
                          type="number"
                          label="You'll send"
                          value={formik.values.fromamt}
                          onChange={formik.handleChange}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid xs={2} className={classes.arrow} item>
                    <IconButton>
                      <SwapHorizOutlinedIcon />
                    </IconButton>
                  </Grid>
                  <Grid xs={4} item>
                    <Grid spacing={2} container>
                      <Grid xs={12} sm={12} md={12} lg={5} xl={5} item>
                        <FormControl variant="outlined" fullWidth>
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
                              <em>Select Fiat</em>
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
                      <Grid xs={12} sm={12} md={12} lg={7} xl={7} item>
                        <TextField
                          id="toamt"
                          name="toamt"
                          variant="outlined"
                          type="number"
                          label="You'll receive"
                          value={formik.values.toamt}
                          onChange={formik.handleChange}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid xs={false} sm={false} md={false} lg={1} xl={1} item />
                </Grid>
                <Box
                  component="div"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-around"
                  marginBottom={1}
                >
                  <Typography variant="subtitle1">Exchange Rate: 5.3837</Typography>
                  <Typography variant="subtitle1">Fees: 1.5</Typography>
                </Box>
              </CardContent>
              <Divider />
              <CardActions className={classes.actions}>
                {activeStep !== 0 ? (
                  <Button
                    color="primary"
                    startIcon={<ArrowBackIosOutlinedIcon />}
                    onClick={handlePrev}
                    className={classes.left}
                  >
                    Prev
                  </Button>
                ) : null}
                <Button
                  color="primary"
                  endIcon={<ChevronRightOutlinedIcon />}
                  onClick={handleNext}
                  className={classes.right}
                >
                  Next
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ) : null}
        {activeStep === 1 ? (
          <Grid xs={12} item>
            <Card className={classes.card}>
              <CardContent>
                <Grid spacing={2} container>
                  <Grid xs={12} item>
                    <FormControlLabel
                      label="Using default blank details"
                      control={
                        <Switch
                          color="primary"
                          id="usingDefault"
                          name="usingDefault"
                          checked={formik.values.usingDefault}
                          onChange={formik.handleChange}
                        />
                      }
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={6} item>
                    <TextField
                      id="payDetail.field1name"
                      name="payDetail.field1name"
                      variant="outlined"
                      label="Bank Name"
                      placeholder="Bank Name"
                      disabled={formik.values.usingDefault}
                      value={formik.values.payDetail.field1name}
                      onChange={formik.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={6} item>
                    <TextField
                      id="payDetail.field2name"
                      name="payDetail.field2name"
                      variant="outlined"
                      label="Branch Number"
                      placeholder="Branch Number"
                      disabled={formik.values.usingDefault}
                      value={formik.values.payDetail.field2name}
                      onChange={formik.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={6} item>
                    <TextField
                      id="payDetail.field3name"
                      name="payDetail.field3name"
                      variant="outlined"
                      label="Account Number"
                      placeholder="Account Number"
                      disabled={formik.values.usingDefault}
                      value={formik.values.payDetail.field3name}
                      onChange={formik.handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={6} item>
                    <TextField
                      id="payDetail.field4name"
                      name="payDetail.field4name"
                      variant="outlined"
                      label="Account Name"
                      placeholder="Account Name"
                      disabled={formik.values.usingDefault}
                      value={formik.values.payDetail.field4name}
                      onChange={formik.handleChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions className={classes.actions}>
                <Button
                  color="primary"
                  startIcon={<ArrowBackIosOutlinedIcon />}
                  onClick={handlePrev}
                  className={classes.left}
                >
                  Prev
                </Button>
                <Button
                  color="primary"
                  endIcon={<ChevronRightOutlinedIcon />}
                  onClick={handleNext}
                  className={classes.right}
                >
                  Next
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ) : null}
        {activeStep === 2 ? (
          <Grid xs={12} item>
            <Card className={classes.card}>
              <CardContent>
                <Alert severity="info">
                  After expiry time, if the trade is not complete, the crypto will return to your
                  wallet.
                </Alert>
                <Grid spacing={2} className={classes.picker} container>
                  <Grid xs={12} sm={12} md={6} lg={4} xl={3} item>
                    <DatePicker
                      id="expiry"
                      name="expiry"
                      format="YYYY-MM-DD"
                      label="Expiry Time"
                      value={formik.values.expiry ? new Date(formik.values.expiry) : null}
                      onChange={handleDatePickerChange}
                      emptyLabel="Please Select Date"
                      invalidDateMessage="Invalid Date Format"
                      inputVariant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions className={classes.actions}>
                <Button
                  color="primary"
                  disabled={loading}
                  startIcon={<ArrowBackIosOutlinedIcon />}
                  onClick={handlePrev}
                  className={classes.left}
                >
                  Prev
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="outlined"
                  onClick={handleNext}
                  className={classes.right}
                >
                  {loading ? 'Creating...' : 'Create Offer'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ) : null}
      </Grid>
    </form>
  );
};

export default OfferFormPage;
