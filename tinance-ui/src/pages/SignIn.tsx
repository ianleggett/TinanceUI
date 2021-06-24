import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useRequest } from 'ahooks';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { useUserDispatch } from '../components';
import { SignInService } from '../services';
import { saveProfile, saveToken } from '../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    'display': 'flex',
    'flexDirection': 'column',
    'padding': '64px 16px',
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

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignInPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useUserDispatch();

  const { run: signin, loading } = useRequest(SignInService, {
    onSuccess(res) {
      const { token, username } = res;

      if (!token) {
        enqueueSnackbar(res.errorMessage || 'Sign in failed', {
          variant: 'warning',
        });

        return;
      }

      // TODO: User object (instead of username) after sign in successful?
      const user = {
        id: 1,
        username,
        avatar: 'https://material-ui.com/static/images/avatar/3.jpg',
      };

      saveToken(token);
      saveProfile(user);

      dispatch({
        type: 'saveUserInfo',
        payload: user,
      });

      enqueueSnackbar('Sign in successful', {
        variant: 'success',
      });

      const redirectUrl = new URLSearchParams(window.location.search).get('from');

      if (redirectUrl && redirectUrl.startsWith('/') && redirectUrl !== '/signin') {
        history.replace(redirectUrl);
      } else {
        history.replace('/');
      }
    },
    onError(error) {
      enqueueSnackbar(error.message || 'Sign in failed', {
        variant: 'warning',
      });
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
    <Container maxWidth="xs" disableGutters>
      <form onSubmit={handleSubmit} className={classes.root}>
        <TextField
          id="username"
          name="username"
          label="Username"
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
          label="Password"
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
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
        <Box display="flex" justifyContent="space-between" className={classes.links}>
          <Button variant="text" color="primary" onClick={handleGoToForgotPasswordPage}>
            Forgot Password?
          </Button>
          <Button variant="text" color="primary" onClick={handleGoToSignUpPage}>
            Need an account? Sign up!
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default SignInPage;
