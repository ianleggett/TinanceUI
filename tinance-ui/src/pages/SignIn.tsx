import { Box, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRequest } from 'ahooks';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { SignInService } from '../services';

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

const SignInPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const { run: login, loading } = useRequest(SignInService, {
    onSuccess(res) {
      console.log(res);
    },
    onError(error) {
      console.error(error.message);
    },
  });

  const handleGoToForgotPasswordPage = useCallback(() => {
    history.push('/forgot-password');
  }, [history]);

  const handleGoToSignUpPage = useCallback(() => {
    history.push('/signup');
  }, [history]);

  return (
    <form className={classes.root}>
      <TextField id="username" label="Username" variant="outlined" />
      <TextField id="password" label="Password" variant="outlined" type="password" />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        size="large"
        className={classes.submit}
      >
        Sign In
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
  );
};

export default SignInPage;
