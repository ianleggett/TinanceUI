import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { useMount, useRequest } from 'ahooks';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { useUserManager } from '../components';
import { ChangePasswordService, SignOutService } from '../services';
import { clearProfile, clearToken, clearTokenExpiryTime } from '../utils';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  active: {
    color: theme.palette.primary.main,
  },
  card: {
    padding: 32,
    marginBottom: 16,
    position: 'relative',
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
  userid: {
    display: 'none',
  },
  submit: {
    marginTop: theme.spacing(3),
  },
}));

const initialValues = {
  userid: 0,
  oldpwd: '',
  newpwd: '',
  newpwd2: '',
};

const ChangePasswordPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [{ profile }, dispatch] = useUserManager();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const direction = useMemo(() => (matches ? 'row' : 'column'), [matches]);
  const [showPassword, setShowPassowrd] = useState(false);
  const [showNewPassword, setShowNewPassowrd] = useState(false);

  const validationSchema = useMemo(() => {
    return yup.object({
      userid: yup.number().required(t('User ID is required')),
      oldpwd: yup.string().required(t('Old password is required')),
      newpwd: yup
        .string()
        .min(6, t('Password should be at least 6 chars'))
        .required(t('New password is required')),
      newpwd2: yup
        .string()
        .min(6, t('Password should be at least 6 chars'))
        .required(t('New password is required')),
    });
  }, [t]);

  const { run: signout } = useRequest(SignOutService);
  const { run: changePassword, loading } = useRequest(ChangePasswordService, {
    onSuccess(res) {
      if (res.statusCode === 0) {
        history.push('/account/password');
        enqueueSnackbar(t('Change password successful'), {
          variant: 'success',
        });

        signout();

        dispatch({
          type: 'clearUserInfo',
        });

        clearToken();
        clearProfile();
        clearTokenExpiryTime();

        history.replace('/signin');
        enqueueSnackbar(t('Please login with new password'), {
          variant: 'success',
        });
      } else {
        enqueueSnackbar(res.msg || t('Change password failed'), {
          variant: 'warning',
        });
      }
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit(values) {
      const { newpwd2, ...restValues } = values;

      if (newpwd2 !== values.newpwd) {
        enqueueSnackbar(t('Password should the same as confirm password'), {
          variant: 'warning',
        });
        return;
      }

      if (newpwd2 === values.oldpwd) {
        enqueueSnackbar(t('New password is the same as old password'), {
          variant: 'warning',
        });
        return;
      }

      changePassword(restValues);
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

  const handleGoToUserProfilePage = useCallback(() => {
    history.push('/account/profile');
  }, [history]);

  const handleToggleShowPassword = useCallback(() => {
    setShowPassowrd((prevState) => !prevState);
  }, []);

  const handleToggleShowNewPassword = useCallback(() => {
    setShowNewPassowrd((prevState) => !prevState);
  }, []);

  useMount(() => {
    if (profile) {
      formik.setFieldValue('userid', profile.id);
    } else {
      enqueueSnackbar(t('Get user profile failed'), {
        variant: 'warning',
      });
    }
  });

  return (
    <Grid container direction={direction} spacing={2} className={classes.container}>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
        <Paper>
          <List component="nav" aria-label={t('User Center')}>
            <ListItem onClick={handleGoToUserProfilePage} button>
              <ListItemIcon>
                <PersonOutlineIcon />
              </ListItemIcon>
              <ListItemText primary={t('Profile')} />
            </ListItem>
            <ListItem className={classes.active} button>
              <ListItemIcon>
                <LockOutlinedIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={t('Change Password')} />
            </ListItem>
          </List>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
        <Paper className={classes.card}>
          <Typography component="h2" variant="h3" color="primary" className={classes.title}>
            {t('Change Password')}
          </Typography>
          <Typography component="p" variant="subtitle1" className={classes.subtitle}>
            {t('Input old password and new password twice to change your password')}
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              id="userid"
              name="userid"
              label={t('User ID')}
              variant="outlined"
              disabled={loading}
              autoComplete="username"
              value={formik.values.userid}
              onChange={formik.handleChange}
              className={classes.userid}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id="oldpwd"
              name="oldpwd"
              type={showPassword ? 'text' : 'password'}
              label={t('Old Password')}
              variant="outlined"
              disabled={loading}
              autoComplete="old-password"
              value={formik.values.oldpwd}
              onChange={formik.handleChange}
              error={formik.touched.oldpwd && Boolean(formik.errors.oldpwd)}
              helperText={formik.touched.oldpwd && formik.errors.oldpwd}
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
              id="newpwd"
              name="newpwd"
              type={showNewPassword ? 'text' : 'password'}
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
                      onClick={handleToggleShowNewPassword}
                      aria-label={t('Toggle password visibility')}
                    >
                      {showNewPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="newpwd2"
              name="newpwd2"
              type={showNewPassword ? 'text' : 'password'}
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
                      onClick={handleToggleShowNewPassword}
                      aria-label={t('Toggle password visibility')}
                    >
                      {showNewPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
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
              {loading ? t('Changing...') : t('Change Password')}
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ChangePasswordPage;
