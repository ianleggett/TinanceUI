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

import { ResetPasswordService } from '../services';

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
  password: '',
  password2: '',
};

const ResetPasswordPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { search } = useLocation();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const codeRef = useRef(new URLSearchParams(search).get('code') ?? '');
  const usernameRef = useRef(new URLSearchParams(search).get('username') ?? '');

  const validationSchema = useMemo(() => {
    return yup.object({
      username: yup.string().required(t('Username is required')),
      password: yup
        .string()
        .min(6, t('Password should be at least 6 chars'))
        .required(t('Password is required')),
      password2: yup
        .string()
        .min(6, t('Password should be at least 6 chars'))
        .required(t('Password is required')),
    });
  }, [t]);

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
      const { username, password, password2 } = values;

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

      if (password !== password2) {
        enqueueSnackbar(t('Password should the same as confirm password'), {
          variant: 'warning',
        });
        return;
      }

      // TODO: change the params
      resetPassword({
        v: codeRef.current,
        n: username,
        p: password,
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
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            label={t('New Password')}
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
            label={t('Confirm New Password')}
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
