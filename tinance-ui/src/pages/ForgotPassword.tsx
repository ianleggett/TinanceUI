import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useRequest, useUnmount } from 'ahooks';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { useAppConfigState } from '../components';
import { ForgotPasswordService } from '../services';
import { fixRegex } from '../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '64px 0',
    padding: '32px 16px',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(1),
  },
  subtitle: {
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
}));

const initialValues = {
  username: '',
  email: '',
};

const ForgotPasswordPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { validationRegex } = useAppConfigState();
  const emailRef = useRef('');

  const usernamePattern = useMemo(() => {
    return fixRegex(validationRegex.username);
  }, [validationRegex.username]);

  const validationSchema = useCallback(() => {
    return yup.lazy((values: typeof initialValues) =>
      yup.object({
        username: yup
          .string()
          .required(t('Username is required'))
          .matches(
            new RegExp(usernamePattern),
            `Username should match pattern: ${usernamePattern}`,
          ),
        email: yup
          .string()
          .required(t('Email address is Required'))
          .email(t('Invalid email adrress format')),
      }),
    );
  }, [t, usernamePattern]);

  const {
    run: forgotPassword,
    loading,
    cancel,
  } = useRequest(ForgotPasswordService, {
    onSuccess(res) {
      if (res.statusCode === 0) {
        history.replace(`/forgot-password/success?email=${emailRef.current}`);
        enqueueSnackbar(t('Reset email has been sent'), {
          variant: 'success',
        });
      } else {
        enqueueSnackbar(res.msg || t('Sending reset email failed'), {
          variant: 'warning',
        });
      }
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      forgotPassword(values);
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

  const handleGoToSignInPage = useCallback(() => {
    history.push('/signin');
  }, [history]);

  useUnmount(() => {
    cancel();
  });

  return (
    <Container maxWidth="sm" disableGutters>
      <Paper className={classes.root}>
        <Typography component="h2" variant="h3" color="primary" className={classes.title}>
          {t('Forgot Password')}
        </Typography>
        <Typography component="p" variant="subtitle1" className={classes.subtitle}>
          {t('Input your username and email to get a password reset link')}
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
          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            className={classes.submit}
          >
            {loading ? t('Sending...') : t('Send Reset Email')}
          </Button>
          <Box display="flex" justifyContent="center" className={classes.links}>
            <Button variant="text" color="primary" onClick={handleGoToSignInPage}>
              {t('Already found my password? Sign in!')}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ForgotPasswordPage;
