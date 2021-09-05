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
import { useMount, useRequest, useSessionStorageState, useUnmount } from 'ahooks';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import groupBy from 'lodash-es/groupBy';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { useAppConfigState } from '../components';
import { AddUpdateOrderService, GetUserBankService } from '../services';
import { snackbar, toFixed } from '../utils';

const MIN_VOL = 20; // smallest trade size
const MIN_VOL_TEXT = `Min volume (${MIN_VOL})`;

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
  payType: {
    payTypeId: number;
    field1value: string;
    field2value: string;
    field3value: string;
    field4value: string;
    field5value: string;
    usernotes: string;
  };
}

const initialValues: InitialValues = {
  fromccyid: 9,
  fromamt: '',
  toccyid: 1,
  toamt: '',
  payType: {
    payTypeId: 0,
    field1value: '',
    field2value: '',
    field3value: '',
    field4value: '',
    field5value: '',
    usernotes: '',
  },
};

const formatter = 'YYYY-MM-DDTHH:mm';

const OfferFormPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { oid } = useParams<{ oid: string }>();
  const { t } = useTranslation();
  const { feeRate } = useAppConfigState();
  const { ccyCodes, relativeExpiryTime } = useAppConfigState();
  const [invert, setInvert] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [usingDefault, setUsingDefault] = useState(true);
  const [expiryTime, setExpiryTime] = useState(dayjs().add(relativeExpiryTime, 'hours'));
  const [bankDetails, setBankDetails] = useState<API.GetUserBankResponse | null>(null);
  const [cachedOffer, setCachedOffer] = useSessionStorageState<Offer.Model>('current_offer');

  const steps = useMemo(() => {
    return [t('Offer Details'), t('Payment Details'), t('Expiry Time')];
  }, [t]);

  /** Options of Crypto and Fiat select */
  const options = useMemo(() => {
    const { ERC20, Fiat } = groupBy(
      ccyCodes.filter((v) => v.enable),
      'ccyType',
    );

    return {
      fromccyid: invert ? Fiat : ERC20,
      toccyid: invert ? ERC20 : Fiat,
    };
  }, [ccyCodes, invert]);

  const labels = useMemo(() => {
    return {
      fromccyid: invert ? t('Fiat') : t('Crypto'),
      toccyid: invert ? t('Crypto') : t('Fiat'),
    };
  }, [invert, t]);

  const { run: getBankDetails } = useRequest(GetUserBankService, {
    onSuccess(res) {
      if (res.id) {
        setBankDetails(res);
      } else {
        snackbar.warning(t('Get user bank details failed'));
      }
    },
  });

  const defaultPayDetail = useMemo(() => {
    if (!bankDetails) {
      return initialValues.payType;
    }

    const { field1value, field2value, field3value, field4value, field5value, usernotes, payType } =
      bankDetails;

    return {
      field1value,
      field2value,
      field3value,
      field4value,
      field5value,
      usernotes,
      payTypeId: payType.id,
    };
  }, [bankDetails]);

  const defaultPayType = useMemo(() => {
    if (!bankDetails) {
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

    return bankDetails.payType;
  }, [bankDetails]);

  const validationSchema = useMemo(() => {
    return yup.object({
      fromamt: yup.number().min(MIN_VOL, MIN_VOL_TEXT).required(t('From amount is required')),
      toamt: yup.number().min(MIN_VOL, MIN_VOL_TEXT).required(t('To amount is required')),
    });
  }, [t]);

  const { run, loading } = useRequest(AddUpdateOrderService, {
    onSuccess(res) {
      if (res.statusCode === 0) {
        history.push('/offers');
        snackbar.success(t(oid ? 'Offer updated successful' : 'New offer created successful'));
      } else {
        snackbar.warning(res.msg || t(oid ? 'Offer updated failed' : 'New offer created failed'));
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

  const calcFees = useCallback(
    (fromamt: string, toamt: string): string => {
      const from = fromamt === '' ? 0 : Number.parseInt(fromamt, 10);
      const to = toamt === '' ? 0 : Number.parseInt(toamt, 10);

      if (from !== 0 && to !== 0) {
        return toFixed((invert ? to : from) * feeRate, 4);
      }

      return '--';
    },
    [feeRate, invert],
  );

  const { networkConfig } = useAppConfigState();

  const calcGasFees = useCallback(() => {
    return toFixed(invert ? networkConfig.buyerGasFee : networkConfig.sellerGasFee, 2);
  }, [invert, networkConfig]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit(values) {
      const { fromamt, toamt, payType, ...restValues } = values;

      if (usingDefault) {
        run({
          orderid: oid,
          fromamt: fromamt ? Number.parseInt(fromamt, 10) : 0,
          toamt: fromamt ? Number.parseInt(toamt, 10) : 0,
          expiry: expiryTime.utc().format(formatter),
          ...restValues,
        });
      } else {
        payType.payTypeId = defaultPayDetail.payTypeId;

        run({
          orderid: oid,
          fromamt: fromamt ? Number.parseInt(fromamt, 10) : 0,
          toamt: fromamt ? Number.parseInt(toamt, 10) : 0,
          expiry: expiryTime.utc().format(formatter),
          payType,
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
    setInvert((prevState) => {
      const { fromccyid, fromamt, toamt, toccyid } = formik.values;

      formik.setFieldValue('fromccyid', toccyid);
      formik.setFieldValue('fromamt', toamt);
      formik.setFieldValue('toccyid', fromccyid);
      formik.setFieldValue('toamt', fromamt);

      return !prevState;
    });
  }, [formik]);

  useMount(() => {
    getBankDetails();

    if (oid && cachedOffer) {
      const [paymentDetail] = cachedOffer.paymentDetails;

      setUsingDefault(false);
      setExpiryTime(dayjs.utc(cachedOffer.expiry, 'YYYY-MM-DD HH:mm:ss.SSS').local());

      formik.setFieldValue('fromccyid', cachedOffer.fromccy.id);
      formik.setFieldValue('fromamt', cachedOffer.fromAmount.toString());
      formik.setFieldValue('toccyid', cachedOffer.toccy.id);
      formik.setFieldValue('toamt', cachedOffer.toAmount.toString());

      if (paymentDetail) {
        setBankDetails(paymentDetail);
        setTimeout(() => {
          formik.setFieldValue('payType', defaultPayDetail);
        }, 100);
      }
    }
  });

  useEffect(() => {
    if (usingDefault) {
      formik.setFieldValue('payType', defaultPayDetail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultPayDetail, usingDefault]);

  useUnmount(() => {
    setCachedOffer();
  });

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
                  {t(oid ? 'Update offer' : 'Create new offer')}
                </Typography>

                <Grid spacing={2} className={classes.main} container>
                  <Grid xs={false} sm={false} md={false} lg={1} xl={1} item />
                  <Grid xs={4} item>
                    <Grid spacing={2} container>
                      <Grid xs={12} sm={12} md={12} lg={5} xl={5} item>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel id="fromccyid-select">{labels.fromccyid}</InputLabel>
                          <Select
                            id="fromccyid"
                            name="fromccyid"
                            labelId="fromccyid-select"
                            label={labels.fromccyid}
                            value={formik.values.fromccyid}
                            onChange={formik.handleChange}
                          >
                            {options.fromccyid !== undefined
                              ? options.fromccyid.map((option) => (
                                  <MenuItem key={option.id} value={option.id}>
                                    {option.name}
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
                          inputMode="decimal"
                          label={t("You'll send")}
                          value={formik.values.fromamt}
                          onChange={formik.handleChange}
                          error={formik.touched.fromamt && Boolean(formik.errors.fromamt)}
                          helperText={formik.touched.fromamt && formik.errors.fromamt}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid xs={2} className={classes.arrow} item>
                    <Tooltip title={t('Switch Crypto and Fiat') as string} placement="top" arrow>
                      <IconButton color="primary" onClick={handleSwitchCryptoAndFiat}>
                        <SwapHorizOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid xs={4} item>
                    <Grid spacing={2} container>
                      <Grid xs={12} sm={12} md={12} lg={5} xl={5} item>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel id="toccyid-select">{labels.toccyid}</InputLabel>
                          <Select
                            id="toccyid"
                            name="toccyid"
                            labelId="toccyid-select"
                            label={labels.toccyid}
                            value={formik.values.toccyid}
                            onChange={formik.handleChange}
                          >
                            {options.toccyid !== undefined
                              ? options.toccyid.map((option) => (
                                  <MenuItem key={option.id} value={option.id}>
                                    {option.name}
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
                          inputMode="decimal"
                          label={t("You'll receive")}
                          value={formik.values.toamt}
                          onChange={formik.handleChange}
                          error={formik.touched.toamt && Boolean(formik.errors.toamt)}
                          helperText={formik.touched.toamt && formik.errors.toamt}
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
                  <Typography variant="subtitle1">
                    {t('Gas')}: {calcGasFees()}
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
                      label={t('Using default bank details')}
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

                  {defaultPayType.field1name ? (
                    <Grid xs={12} sm={12} md={6} item>
                      <TextField
                        id="payType.field1value"
                        name="payType.field1value"
                        variant="outlined"
                        label={t(defaultPayType.field1name)}
                        value={formik.values.payType.field1value}
                        onChange={formik.handleChange}
                        fullWidth
                        InputProps={{
                          readOnly: usingDefault,
                        }}
                      />
                    </Grid>
                  ) : null}
                  {defaultPayType.field2name ? (
                    <Grid xs={12} sm={12} md={6} item>
                      <TextField
                        id="payType.field2value"
                        name="payType.field2value"
                        variant="outlined"
                        label={t(defaultPayType.field2name)}
                        value={formik.values.payType.field2value}
                        onChange={formik.handleChange}
                        fullWidth
                        InputProps={{
                          readOnly: usingDefault,
                        }}
                      />
                    </Grid>
                  ) : null}
                  {defaultPayType.field3name ? (
                    <Grid xs={12} sm={12} md={6} item>
                      <TextField
                        id="payType.field3value"
                        name="payType.field3value"
                        variant="outlined"
                        label={t(defaultPayType.field3name)}
                        value={formik.values.payType.field3value}
                        onChange={formik.handleChange}
                        fullWidth
                        InputProps={{
                          readOnly: usingDefault,
                        }}
                      />
                    </Grid>
                  ) : null}
                  {defaultPayType.field4name ? (
                    <Grid xs={12} sm={12} md={6} item>
                      <TextField
                        id="payType.field4value"
                        name="payType.field4value"
                        variant="outlined"
                        label={t(defaultPayType.field4name)}
                        value={formik.values.payType.field4value}
                        onChange={formik.handleChange}
                        fullWidth
                        InputProps={{
                          readOnly: usingDefault,
                        }}
                      />
                    </Grid>
                  ) : null}
                  {defaultPayType.field5name ? (
                    <Grid xs={12} sm={12} md={6} item>
                      <TextField
                        id="payType.field5value"
                        name="payType.field5value"
                        variant="outlined"
                        label={t(defaultPayType.field5name)}
                        value={formik.values.payType.field5value}
                        onChange={formik.handleChange}
                        fullWidth
                        InputProps={{
                          readOnly: usingDefault,
                        }}
                      />
                    </Grid>
                  ) : null}
                  <Grid xs={12} sm={12} md={6} item>
                    <TextField
                      id="payType.usernotes"
                      name="payType.usernotes"
                      variant="outlined"
                      label={t('Notes')}
                      value={formik.values.payType.usernotes}
                      onChange={formik.handleChange}
                      fullWidth
                      InputProps={{
                        readOnly: usingDefault,
                      }}
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
                      format="YYYY-MM-DD HH:mm"
                      label={t('Expiry Time')}
                      value={expiryTime}
                      onChange={(value) =>
                        setExpiryTime(value ?? dayjs().add(relativeExpiryTime, 'hours'))
                      }
                      emptyLabel={t('Please Select Date Time')}
                      invalidDateMessage={t('Invalid Date Time Format')}
                      inputVariant="outlined"
                      disablePast
                      fullWidth
                    />
                  </Grid>
                  <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
                    {expiryTime.isAfter(dayjs()) ? (
                      <Typography variant="body1" color="primary">
                        {t('This offer will be expired in', {
                          fromNow: expiryTime.fromNow(),
                        })}
                      </Typography>
                    ) : (
                      <Typography variant="body1" color="secondary">
                        {t('This offer has been expired in', {
                          fromNow: expiryTime.fromNow(),
                        })}
                      </Typography>
                    )}
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
                  disabled={dayjs(expiryTime).isBefore(dayjs())}
                >
                  {loading
                    ? t(oid ? 'Updating...' : 'Creating...')
                    : t(oid ? 'Update Offer' : 'Create Offer')}
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
