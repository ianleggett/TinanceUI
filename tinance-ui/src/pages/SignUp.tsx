import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { useRequest } from 'ahooks';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { countryCodes } from '../constants';
import { SignUpService } from '../services';

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
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  countryISO: '001',
  phone: '',
  password: '',
  password2: '',
  country: 'US',
  bank: '',
  bankAccountNumber: '',
  bankBranchNumber: '',
};

const SignUpPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef('');

  const validationSchema = useMemo(() => {
    return yup.object({
      firstName: yup.string().required(t('First name is required')),
      lastName: yup.string().required(t('Last name is required')),
      username: yup.string().required(t('Username is required')),
      email: yup
        .string()
        .email(t('Invalid email adrress format'))
        .required(t('Email address is Required')),
      countryISO: yup.string(),
      phone: yup.string().required(t('Phone number is required')),
      password: yup
        .string()
        .min(6, t('Password should be at least 6 chars'))
        .required(t('Password is required')),
      password2: yup
        .string()
        .min(6, t('Password should be at least 6 chars'))
        .required(t('Password is required')),
      country: yup.string(),
      bank: yup.string(),
      bankAccountNumber: yup.string(),
      bankBranchNumber: yup.string(),
    });
  }, [t]);

  const { run: signup, loading } = useRequest(SignUpService, {
    onSuccess(res) {
      if (res.statusCode === 0) {
        history.replace(`/signup/success?email=${emailRef.current}`);
        enqueueSnackbar(t('Sign up successful'), {
          variant: 'success',
        });
      } else {
        enqueueSnackbar(t('Sign up failed'), {
          variant: 'warning',
        });
      }
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit(values) {
      const { password2, ...restValues } = values;

      if (password2 === values.password) {
        signup(restValues);
        emailRef.current = values.email;
      } else {
        enqueueSnackbar(t('Password should the same as confirm password'), {
          variant: 'warning',
        });
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

  const handleToggleShowPassword = useCallback(() => {
    setShowPassword((prevState) => !prevState);
  }, []);

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
          <TextField
            id="firstName"
            name="firstName"
            label={t('First Name')}
            variant="outlined"
            disabled={loading}
            autoComplete="given-name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            fullWidth
          />
          <TextField
            id="lastName"
            name="lastName"
            label={t('Last Name')}
            variant="outlined"
            disabled={loading}
            autoComplete="family-name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            fullWidth
          />
          <TextField
            id="email"
            name="email"
            type="email"
            label={t('Email Address')}
            variant="outlined"
            disabled={loading}
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
          />
          <Grid spacing={1} container>
            <Grid xs={3} item>
              <Select
                id="countryISO"
                name="countryISO"
                variant="outlined"
                value={formik.values.countryISO}
                onChange={formik.handleChange}
                disabled={loading}
                autoComplete="tel-country-code"
                fullWidth
              >
                {Object.entries(countryCodes).map(([key, value]) => (
                  <MenuItem key={key} value={value.code}>
                    <Typography variant="button" className={classes.country}>
                      {key} ({value.code})
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid xs={9} item>
              <TextField
                id="phone"
                name="phone"
                type="tel"
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
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            label={t('Password')}
            variant="outlined"
            disabled={loading}
            autoComplete="new-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    tabIndex={-1}
                    onClick={handleToggleShowPassword}
                    aria-label={t('Toggle password visibility')}
                  >
                    {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="password2"
            name="password2"
            type={showPassword ? 'text' : 'password'}
            label={t('Confirm Password')}
            variant="outlined"
            disabled={loading}
            autoComplete="new-password"
            value={formik.values.password2}
            onChange={formik.handleChange}
            error={formik.touched.password2 && Boolean(formik.errors.password2)}
            helperText={formik.touched.password2 && formik.errors.password2}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    tabIndex={-1}
                    onClick={handleToggleShowPassword}
                    aria-label={t('Toggle password visibility')}
                  >
                    {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="country-select">{t('Country')}</InputLabel>
            <Select
              id="country"
              name="country"
              label={t('Country')}
              labelId="country-select"
              value={formik.values.country}
              onChange={formik.handleChange}
              disabled={loading}
              autoComplete="country-code"
              fullWidth
            >
              {Object.entries(countryCodes).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="bank"
            name="bank"
            label={t('Bank')}
            variant="outlined"
            disabled={loading}
            value={formik.values.bank}
            onChange={formik.handleChange}
            error={formik.touched.bank && Boolean(formik.errors.bank)}
            helperText={formik.touched.bank && formik.errors.bank}
            fullWidth
          />
          <TextField
            id="bankAccountNumber"
            name="bankAccountNumber"
            label={t('Bank Account Number')}
            variant="outlined"
            disabled={loading}
            value={formik.values.bankAccountNumber}
            onChange={formik.handleChange}
            error={formik.touched.bankAccountNumber && Boolean(formik.errors.bankAccountNumber)}
            helperText={formik.touched.bankAccountNumber && formik.errors.bankAccountNumber}
            fullWidth
          />
          <TextField
            id="bankBranchNumber"
            name="bankBranchNumber"
            label={t('Bank Branch Number')}
            variant="outlined"
            disabled={loading}
            value={formik.values.bankBranchNumber}
            onChange={formik.handleChange}
            error={formik.touched.bankBranchNumber && Boolean(formik.errors.bankBranchNumber)}
            helperText={formik.touched.bankBranchNumber && formik.errors.bankBranchNumber}
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
