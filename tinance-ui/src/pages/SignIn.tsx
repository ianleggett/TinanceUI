import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useRequest } from 'ahooks';
import { useFormik } from 'formik';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { useUserManagerDispatch } from '../components';
import { SignInService } from '../services';
import { saveProfile, saveToken, snackbar } from '../utils';

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
}));

const initialValues = {
  username: '',
  password: '',
};

const SignInPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useUserManagerDispatch();

  const validationSchema = useMemo(() => {
    return yup.object({
      username: yup.string().required(t('Username is required')),
      password: yup.string().required(t('Password is required')),
    });
  }, [t]);

  const { run: signin, loading } = useRequest(SignInService, {
    onSuccess(res) {
      const { token, ...profile } = res;

      if (token) {
        saveToken(token, profile.expirymins);
        saveProfile(profile);
        dispatch({
          type: 'saveUserInfo',
          payload: profile,
        });

        snackbar.success(t('Sign in successful'));

        const redirectUrl = new URLSearchParams(window.location.search).get('from');

        if (redirectUrl && redirectUrl.startsWith('/') && redirectUrl !== '/signin') {
          history.replace(redirectUrl);
        } else {
          history.replace('/');
        }
      } else {
        snackbar.warning(res.message || t('Sign in failed'));
      }
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      signin(values);
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

  const handleGoToForgotPasswordPage = useCallback(() => {
    history.push('/forgot-password');
  }, [history]);

  const handleGoToSignUpPage = useCallback(() => {
    history.push('/signup');
  }, [history]);

  return (
    <Container maxWidth="sm" disableGutters>
      <Paper className={classes.root}>
        <Typography component="h2" variant="h3" color="primary" className={classes.title}>
          {t('Sign In')}
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
            id="password"
            name="password"
            label={t('Password')}
            variant="outlined"
            type="password"
            disabled={loading}
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            className={classes.submit}
          >
            {loading ? t('Signing In...') : t('Sign In')}
          </Button>
          <Box display="flex" justifyContent="space-between" className={classes.links}>
            <Button variant="text" color="primary" onClick={handleGoToForgotPasswordPage}>
              {t('Forgot Password?')}
            </Button>
            <Button variant="text" color="primary" onClick={handleGoToSignUpPage}>
              {t('Need an account? Sign up!')}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default SignInPage;
