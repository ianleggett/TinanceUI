import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useRequest } from 'ahooks';
import { useFormik } from 'formik';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { useAppConfigState } from '../components';
import { countryCodes } from '../constants';
import { SignUpService } from '../services';
import { fixRegex, formatCountryCodeOption, snackbar } from '../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '64px 0',
    padding: '32px 16px',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
  },
  form: {
    'display': 'flex',
    'flexDirection': 'column',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  submit: {
    marginTop: theme.spacing(3),
  },
  links: {
    marginTop: theme.spacing(1),
  },
  country: {
    lineHeight: 'initial',
  },
}));

const initialValues = {
  countryISO: 'USA',
  email: '',
  phone: '',
  username: '',
};

const SignUpPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const { validationRegex } = useAppConfigState();
  const [telCode, setTelCode] = useState('+1');
  const emailRef = useRef('');

  const phonePattern = useMemo(() => {
    return fixRegex(validationRegex.phone?.key);
  }, [validationRegex.phone]);

  const usernamePattern = useMemo(() => {
    return fixRegex(validationRegex.username?.key);
  }, [validationRegex.username]);

  const validationSchema = useCallback(() => {
    return yup.lazy((values: typeof initialValues) =>
      yup.object({
        countryISO: yup.string().required(t('Country is required')),
        phone: yup
          .string()
          .required(t('Phone number is required'))
          .matches(new RegExp(phonePattern), validationRegex.phone?.value),
        email: yup
          .string()
          .required(t('Email address is Required'))
          .email(t('Invalid email adrress format')),
        username: yup
          .string()
          .required(t('Username is required'))
          .matches(new RegExp(usernamePattern), validationRegex.username?.value),
      }),
    );
  }, [
    phonePattern,
    t,
    usernamePattern,
    validationRegex.phone?.value,
    validationRegex.username?.value,
  ]);

  const { run: signup, loading } = useRequest(SignUpService, {
    onSuccess(res) {
      if (res.statusCode === 0) {
        history.replace(`/signup/success?email=${emailRef.current}`);
        snackbar.success(t('Sign up successful'));
      } else {
        snackbar.warning(res.msg || t('Sign up failed'));
      }
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit(values) {
      const { phone, ...restValues } = values;
      signup({
        phone: `${telCode} ${phone}`,
        ...restValues,
      });
      emailRef.current = values.email;
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

  const handleCountryISOChange = useCallback(
    (
      event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
      }>,
    ) => {
      const countryCode = countryCodes.find((v) => v.tripleCode === event.target.value);

      if (countryCode) {
        setTelCode(countryCode.telCode);
      }

      formik.handleChange(event);
    },
    [formik],
  );

  const handleTelCodeChange = useCallback(
    (event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (/^[\d+]{1,8}$/.test(event.currentTarget.value)) {
        setTelCode(event.currentTarget.value);
      }
    },
    [],
  );

  const handleGoToForgotPasswordPage = useCallback(() => {
    history.push('/forgot-password');
  }, [history]);

  const handleGoToSignInPage = useCallback(() => {
    history.push('/signin');
  }, [history]);

  return (
    <Container maxWidth="sm" disableGutters>
      <Paper className={classes.root}>
        <Typography component="h2" variant="h3" color="primary" className={classes.title}>
          {t('Sign Up')}
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="country-select">{t('Country')}</InputLabel>
            <Select
              id="countryISO"
              name="countryISO"
              label={t('Country')}
              labelId="country-select"
              value={formik.values.countryISO}
              onChange={handleCountryISOChange}
              disabled={loading}
              fullWidth
            >
              {countryCodes.map((countryCode) => (
                <MenuItem key={countryCode.tripleCode} value={countryCode.tripleCode}>
                  {formatCountryCodeOption(countryCode)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid spacing={1} container>
            <Grid xs={3} item>
              <TextField
                id="telCode"
                name="telCode"
                variant="outlined"
                disabled={loading}
                inputMode="numeric"
                autoComplete="tel-country-code"
                value={telCode}
                onChange={handleTelCodeChange}
                fullWidth
              />
            </Grid>
            <Grid xs={9} item>
              <TextField
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                label={t('Phone Number')}
                variant="outlined"
                disabled={loading}
                autoComplete="tel-national"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                fullWidth
              />
            </Grid>
          </Grid>
          <TextField
            id="email"
            name="email"
            label={t('Email Address')}
            variant="outlined"
            disabled={loading}
            inputMode="email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
          />
          <TextField
            id="username"
            name="username"
            label={t('Username')}
            variant="outlined"
            disabled={loading}
            autoComplete="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            fullWidth
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            className={classes.submit}
          >
            {loading ? t('Signing Up...') : t('Sign Up')}
          </Button>
          <Box display="flex" justifyContent="space-between" className={classes.links}>
            <Button variant="text" color="primary" onClick={handleGoToForgotPasswordPage}>
              {t('Forgot Password?')}
            </Button>
            <Button variant="text" color="primary" onClick={handleGoToSignInPage}>
              {t('Already have an account? Sign in!')}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUpPage;
