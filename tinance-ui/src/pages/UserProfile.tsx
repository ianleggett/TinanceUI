import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { useMount, useRequest } from 'ahooks';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { useAppConfigState, useUserManager } from '../components';
import { countryCodes } from '../constants';
import { GetUserDetailsService, UpdateUserDetailsService } from '../services';
import { fixRegex, formatCountryCodeOption, saveProfile } from '../utils';

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
  countryISO: 'USA',
  phone: '',
  email: '',
  username: '',
};

const UserProfilePage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { validationRegex } = useAppConfigState();
  const [{ profile }, dispatch] = useUserManager();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const direction = useMemo(() => (matches ? 'row' : 'column'), [matches]);
  const [telCode, setTelCode] = useState('+1');

  const phonePattern = useMemo(() => {
    return fixRegex(validationRegex.phone?.key);
  }, [validationRegex.phone]);

  const usernamePattern = useMemo(() => {
    return fixRegex(validationRegex.username?.key);
  }, [validationRegex.username]);

  const validationSchema = useCallback(() => {
    return yup.lazy((values: typeof initialValues) =>
      yup.object({
        userid: yup.number().required(t('User ID is required')),
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

  const { run: getUserDetails } = useRequest(GetUserDetailsService, {
    onSuccess(res) {
      if (res.id) {
        saveProfile(res);

        dispatch({
          type: 'saveUserInfo',
          payload: res,
        });

        enqueueSnackbar(t('Change profile successful'), {
          variant: 'success',
        });
      } else {
        enqueueSnackbar(t('Update profile failed'), {
          variant: 'warning',
        });
      }
    },
  });

  const { run: updateUserDetails, loading } = useRequest(UpdateUserDetailsService, {
    onSuccess(res) {
      if (res.statusCode === 0) {
        getUserDetails();
        enqueueSnackbar(t('Change profile successful'), {
          variant: 'success',
        });
      } else {
        enqueueSnackbar(res.msg || t('Change profile failed'), {
          variant: 'warning',
        });
      }
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit(values) {
      const { phone, ...restValues } = values;

      updateUserDetails({
        phone: `${telCode} ${phone}`,
        ...restValues,
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

  const handleGoToChangePasswordPage = useCallback(() => {
    history.push('/account/password');
  }, [history]);

  const handleGoToUserWalletPage = useCallback(() => {
    history.push('/account/wallet');
  }, [history]);

  const handleGoToBankDetailsPage = useCallback(() => {
    history.push('/account/bank-details');
  }, [history]);

  useMount(() => {
    if (profile) {
      const { id, countryISO, phone, email, username } = profile;

      formik.setFieldValue('userid', id);
      formik.setFieldValue('email', email);
      formik.setFieldValue('username', username);

      if (countryISO) {
        formik.setFieldValue('countryISO', countryISO);
      }

      if (phone) {
        const [first, ...rest] = phone.split(' ');

        setTelCode(first);
        formik.setFieldValue('phone', rest.join(' '));
      } else {
        const country = countryCodes.find((v) => v.tripleCode === countryISO);
        if (country) {
          setTelCode(country.telCode);
        }
      }
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
            <ListItem className={classes.active} button>
              <ListItemIcon>
                <PersonOutlineIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={t('User Profile')} />
            </ListItem>
            <ListItem onClick={handleGoToUserWalletPage} button>
              <ListItemIcon>
                <AccountBalanceWalletOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={t('User Wallet')} />
            </ListItem>
            <ListItem onClick={handleGoToBankDetailsPage} button>
              <ListItemIcon>
                <AccountBalanceOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={t('Bank Details')} />
            </ListItem>
            <ListItem onClick={handleGoToChangePasswordPage} button>
              <ListItemIcon>
                <LockOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={t('Change Password')} />
            </ListItem>
          </List>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
        <Paper className={classes.card}>
          <Typography component="h2" variant="h3" color="primary" className={classes.title}>
            {t('User Profile')}
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
              type="email"
              label={t('Email Address')}
              variant="outlined"
              disabled={loading}
              inputMode="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                readOnly: true,
              }}
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
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              className={classes.submit}
            >
              {loading ? t('Changing...') : t('Change Profile')}
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserProfilePage;
