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
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import SwapHorizOutlinedIcon from '@material-ui/icons/SwapHorizOutlined';
import Alert from '@material-ui/lab/Alert';
import { DateTimePicker } from '@material-ui/pickers';
import type { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { useRequest } from 'ahooks';
import { useFormik } from 'formik';
import groupBy from 'lodash-es/groupBy';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { useAppConfigState, useUserManagerState } from '../components';
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
  fromamt: string;
  toccyid: number;
  toamt: string;
  expiry: string;
  payDetail: {
    payTypeId: number;
    field1value: string;
    field2value: string;
    field3value: string;
    field4value: string;
    field5value: string;
  };
}

const initialValues: InitialValues = {
  fromccyid: 0,
  fromamt: '',
  toccyid: 0,
  toamt: '',
  expiry: '',
  payDetail: {
    payTypeId: 0,
    field1value: '',
    field2value: '',
    field3value: '',
    field4value: '',
    field5value: '',
  },
};

const OfferFormPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const { feeRate } = useAppConfigState();
  const { profile } = useUserManagerState();
  const { enqueueSnackbar } = useSnackbar();
  const { ccyCodes } = useAppConfigState();
  const [activeStep, setActiveStep] = useState(0);
  const [usingDefault, setUsingDefault] = useState(true);

  const steps = useMemo(() => {
    return [t('Offer Details'), t('Payment Details'), t('Expiry Time')];
  }, [t]);

  /** Options of Crypto and Fiat select */
  const options = useMemo(() => {
    return groupBy(
      ccyCodes.filter((v) => v.enable),
      'ccyType',
    );
  }, [ccyCodes]);

  const defaultPayDetail = useMemo(() => {
    if (!profile) {
      return initialValues.payDetail;
    }

    const { field1value, field2value, field3value, field4value, field5value, payType } =
      profile.payDetails[0];

    return {
      field1value,
      field2value,
      field3value,
      field4value,
      field5value,
      payTypeId: payType.id,
    };
  }, [profile]);

  const payType = useMemo(() => {
    if (!profile) {
      return {
        id: 1,
        name: 'Bank Transfer',
        field1name: 'Bank Name',
        field2name: 'Sort Code',
        field3name: 'Account Number',
        field4name: 'IBAN',
        field5name: 'Country',
        enabled: true,
      };
    }

    return profile.payDetails[0].payType;
  }, [profile]);

  const { run, loading } = useRequest(AddUpdateOrderService, {
    onSuccess(res) {
      if (res) {
        history.push('/offers');
        enqueueSnackbar(t('New offer created successful'), {
          variant: 'success',
        });
      }
    },
  });

  const calcExchangeRate = useCallback((fromamt: string, toamt: string): string => {
    const from = fromamt === '' ? 0 : Number.parseInt(fromamt, 10);
    const to = toamt === '' ? 0 : Number.parseInt(toamt, 10);

    if (from !== 0 && to !== 0) {
      return (to / from).toFixed(4);
    }

    return '--';
  }, []);

  const calcFees = useCallback(
    (fromamt: string, toamt: string): string => {
      const from = fromamt === '' ? 0 : Number.parseInt(fromamt, 10);
      const to = toamt === '' ? 0 : Number.parseInt(toamt, 10);

      if (from !== 0 && to !== 0) {
        return (from * feeRate).toFixed(4);
      }

      return '--';
    },
    [feeRate],
  );

  const formik = useFormik({
    initialValues,
    onSubmit(values) {
      const { fromamt, toamt, payDetail, ...restValues } = values;

      if (usingDefault) {
        run({
          fromamt: fromamt ? Number.parseInt(fromamt, 10) : 0,
          toamt: fromamt ? Number.parseInt(toamt, 10) : 0,
          ...restValues,
        });
      } else {
        run({
          fromamt: fromamt ? Number.parseInt(fromamt, 10) : 0,
          toamt: fromamt ? Number.parseInt(toamt, 10) : 0,
          payDetail,
          ...restValues,
        });
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
      formik.handleChange(date ? date.format('YYYY-MM-DD HH:mm') : '');
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

  const handleToggleSwitch = useCallback(() => {
    setUsingDefault((prevState) => !prevState);
  }, []);

  const handleSwitchCryptoAndFiat = useCallback(() => {
    const from = formik.values.fromamt;
    const to = formik.values.toamt;

    formik.setFieldValue('fromamt', to);
    formik.setFieldValue('toamt', from);
  }, [formik]);

  useEffect(() => {
    if (usingDefault) {
      formik.setFieldValue('payDetail', defaultPayDetail);
    } else {
      formik.setFieldValue('payDetail', initialValues.payDetail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usingDefault]);

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
                  {t('Create new offer')}
                </Typography>

                <Grid spacing={2} className={classes.main} container>
                  <Grid xs={false} sm={false} md={false} lg={1} xl={1} item />
                  <Grid xs={4} item>
                    <Grid spacing={2} container>
                      <Grid xs={12} sm={12} md={12} lg={5} xl={5} item>
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
                              <em>{t('Select Crypto')}</em>
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
                          inputMode="numeric"
                          label={t("You'll send")}
                          value={formik.values.fromamt}
                          onChange={formik.handleChange}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid xs={2} className={classes.arrow} item>
                    <Tooltip title={t('Switch Crypto and Fiat') as string}>
                      <IconButton color="primary" onClick={handleSwitchCryptoAndFiat}>
                        <SwapHorizOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid xs={4} item>
                    <Grid spacing={2} container>
                      <Grid xs={12} sm={12} md={12} lg={5} xl={5} item>
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
                              <em>{t('Select Fiat')}</em>
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
                          inputMode="numeric"
                          label={t("You'll receive")}
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
                  <Typography variant="subtitle1">
                    {t('Exchange Rate')}:{' '}
                    {calcExchangeRate(formik.values.fromamt, formik.values.toamt)}
                  </Typography>
                  <Typography variant="subtitle1">
                    {t('Fees')}: {calcFees(formik.values.fromamt, formik.values.toamt)}
                  </Typography>
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
                    {t('Prev')}
                  </Button>
                ) : null}
                <Button
                  color="primary"
                  endIcon={<ChevronRightOutlinedIcon />}
                  onClick={handleNext}
                  className={classes.right}
                >
                  {t('Next')}
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
                      label={t('Using default blank details')}
                      control={
                        <Switch
                          color="primary"
                          id="usingDefault"
                          name="usingDefault"
                          checked={usingDefault}
                          onChange={handleToggleSwitch}
                        />
                      }
                    />
                  </Grid>
                  {payType.field1name ? (
                    <Grid xs={12} sm={12} md={6} item>
                      <TextField
                        id="payDetail.field1value"
                        name="payDetail.field1value"
                        variant="outlined"
                        label={payType.field1name}
                        placeholder={payType.field1name}
                        value={formik.values.payDetail.field1value}
                        onChange={formik.handleChange}
                        fullWidth
                        InputProps={{
                          readOnly: usingDefault,
                        }}
                      />
                    </Grid>
                  ) : null}
                  {payType.field2name ? (
                    <Grid xs={12} sm={12} md={6} item>
                      <TextField
                        id="payDetail.field2value"
                        name="payDetail.field2value"
                        variant="outlined"
                        label={payType.field2name}
                        placeholder={payType.field2name}
                        value={formik.values.payDetail.field2value}
                        onChange={formik.handleChange}
                        fullWidth
                        InputProps={{
                          readOnly: usingDefault,
                        }}
                      />
                    </Grid>
                  ) : null}
                  {payType.field3name ? (
                    <Grid xs={12} sm={12} md={6} item>
                      <TextField
                        id="payDetail.field3value"
                        name="payDetail.field3value"
                        variant="outlined"
                        label={payType.field3name}
                        placeholder={payType.field3name}
                        value={formik.values.payDetail.field3value}
                        onChange={formik.handleChange}
                        fullWidth
                        InputProps={{
                          readOnly: usingDefault,
                        }}
                      />
                    </Grid>
                  ) : null}
                  {payType.field4name ? (
                    <Grid xs={12} sm={12} md={6} item>
                      <TextField
                        id="payDetail.field4value"
                        name="payDetail.field4value"
                        variant="outlined"
                        label={payType.field4name}
                        placeholder={payType.field4name}
                        value={formik.values.payDetail.field4value}
                        onChange={formik.handleChange}
                        fullWidth
                        InputProps={{
                          readOnly: usingDefault,
                        }}
                      />
                    </Grid>
                  ) : null}
                  {payType.field5name ? (
                    <Grid xs={12} sm={12} md={6} item>
                      <TextField
                        id="payDetail.field5value"
                        name="payDetail.field5value"
                        variant="outlined"
                        label={payType.field5name}
                        placeholder={payType.field5name}
                        value={formik.values.payDetail.field5value}
                        onChange={formik.handleChange}
                        fullWidth
                        InputProps={{
                          readOnly: usingDefault,
                        }}
                      />
                    </Grid>
                  ) : null}
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
                  {t('Prev')}
                </Button>
                <Button
                  color="primary"
                  endIcon={<ChevronRightOutlinedIcon />}
                  onClick={handleNext}
                  className={classes.right}
                >
                  {t('Next')}
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
                  {t(
                    'After expiry time, if the trade is not complete, the crypto will return to your wallet',
                  )}
                </Alert>
                <Grid spacing={2} className={classes.picker} container>
                  <Grid xs={12} sm={12} md={6} lg={4} xl={3} item>
                    <DateTimePicker
                      id="expiry"
                      name="expiry"
                      format="YYYY-MM-DD HH:mm"
                      label={t('Expiry Time')}
                      value={formik.values.expiry ? new Date(formik.values.expiry) : null}
                      onChange={handleDatePickerChange}
                      emptyLabel={t('Please Select Date Time')}
                      invalidDateMessage={t('Invalid Date Time Format')}
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
                  {t('Prev')}
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="outlined"
                  onClick={handleNext}
                  className={classes.right}
                >
                  {loading ? t('Creating...') : t('Create Offer')}
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
