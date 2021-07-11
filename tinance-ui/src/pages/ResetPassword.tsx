import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { useMount, useRequest } from 'ahooks';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import * as yup from 'yup';

import { useAppConfigState } from '../components';
import { ResetPasswordService } from '../services';
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
    marginBottom: theme.spacing(2),
  },
  form: {
    'display': 'flex',
    'flexDirection': 'column',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  username: {
    display: 'none',
  },
  submit: {
    marginTop: theme.spacing(3),
  },
}));

const initialValues = {
  code: '',
  username: '',
  newpwd: '',
  newpwd2: '',
};

const ResetPasswordPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { search } = useLocation();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { validationRegex } = useAppConfigState();
  const [showPassword, setShowPassword] = useState(false);
  const codeRef = useRef(new URLSearchParams(search).get('code') ?? '');
  const usernameRef = useRef(new URLSearchParams(search).get('username') ?? '');

  const passwordPattern = useMemo(() => {
    return fixRegex(validationRegex.password.key);
  }, [validationRegex.password]);

  const usernamePattern = useMemo(() => {
    return fixRegex(validationRegex.username.key);
  }, [validationRegex.username]);

  const validationSchema = useCallback(() => {
    return yup.lazy((values: typeof initialValues) =>
      yup.object({
        username: yup
          .string()
          .required(t('Username is required'))
          .matches(new RegExp(usernamePattern), validationRegex.username.value),
        newpwd: yup
          .string()
          .required(t('New password is required'))
          .matches(new RegExp(passwordPattern), validationRegex.password.value),
        newpwd2: yup
          .string()
          .required(t('New password is required'))
          .matches(new RegExp(passwordPattern), validationRegex.password.value)
          .oneOf(
            [yup.ref('password'), null],
            t('Confirm new password should be the same as new password'),
          ),
      }),
    );
  }, [
    passwordPattern,
    t,
    usernamePattern,
    validationRegex.password.value,
    validationRegex.username.value,
  ]);

  const { run: resetPassword, loading } = useRequest(ResetPasswordService, {
    onSuccess(res) {
      if (res.statusCode === 0) {
        history.replace(`/signin`);
        enqueueSnackbar(t('Your password has been reset'), {
          variant: 'success',
        });
      } else {
        enqueueSnackbar(t('Reset password failed'), {
          variant: 'warning',
        });
      }
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit(values) {
      const { username, newpwd } = values;

      if (!codeRef.current) {
        enqueueSnackbar(t("Can't find one time code for verifying your identity"), {
          variant: 'warning',
        });
        return;
      }

      if (!username) {
        enqueueSnackbar(t("Can't find username for verifying your identity"), {
          variant: 'warning',
        });
        return;
      }

      // TODO: change the params
      resetPassword({
        v: codeRef.current,
        n: username,
        p: newpwd,
      });
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

  useMount(() => {
    if (!usernameRef.current) {
      enqueueSnackbar(t("Can't find username for verifying your identity"), {
        variant: 'warning',
      });
      return;
    }

    if (!codeRef.current) {
      enqueueSnackbar(t("Can't find one time code for verifying your identity"), {
        variant: 'warning',
      });
      return;
    }

    formik.setFieldValue('username', usernameRef.current);
  });

  return (
    <Container maxWidth="sm" disableGutters>
      <Paper className={classes.root}>
        <Typography component="h2" variant="h3" color="primary" className={classes.title}>
          {t('Reset Password')}
        </Typography>
        <Typography component="p" variant="subtitle1" className={classes.subtitle}>
          {t('Input new password twice to reset your password')}
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
            className={classes.username}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="newpwd"
            name="newpwd"
            type={showPassword ? 'text' : 'password'}
            label={t('New Password')}
            variant="outlined"
            disabled={loading}
            autoComplete="new-password"
            value={formik.values.newpwd}
            onChange={formik.handleChange}
            error={formik.touched.newpwd && Boolean(formik.errors.newpwd)}
            helperText={formik.touched.newpwd && formik.errors.newpwd}
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
            id="newpwd2"
            name="newpwd2"
            type={showPassword ? 'text' : 'password'}
            label={t('Confirm New Password')}
            variant="outlined"
            disabled={loading}
            autoComplete="new-password"
            value={formik.values.newpwd2}
            onChange={formik.handleChange}
            error={formik.touched.newpwd2 && Boolean(formik.errors.newpwd2)}
            helperText={formik.touched.newpwd2 && formik.errors.newpwd2}
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
          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            className={classes.submit}
          >
            {loading ? t('Reseting...') : t('Reset Password')}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPasswordPage;
