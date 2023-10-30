import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { useMount, useRequest, useUpdateEffect } from 'ahooks';
import { useFormik } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { GetUserBankService, UpdateUserBankService } from '../services';
import { snackbar } from '../utils';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  active: {
    color: theme.palette.primary.main,
  },
  hidden: {
    display: 'none',
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
    'marginTop': theme.spacing(4),
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
  payTypeId: 1,
  field1value: '',
  field2value: '',
  field3value: '',
  field4value: '',
  field5value: '',
  usernotes: '',
};

const BankDetailsPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const [bankDetails, setBankDetails] = useState<API.GetUserBankResponse | null>(null);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const direction = useMemo(() => (matches ? 'row' : 'column'), [matches]);

  const payType = useMemo<Partial<API.GetUserBankResponse['payType']>>(() => {
    return bankDetails ? bankDetails.payType : {};
  }, [bankDetails]);

  const validationSchema = useCallback(() => {
    return yup.lazy((values: typeof initialValues) => yup.object({}));
  }, []);

  const { run: getUserBank, loading } = useRequest(GetUserBankService, {
    onSuccess(res) {
      if (res) {
        setBankDetails(res);

        if (!res.id) {
          snackbar.warning(t("You haven't setup your bank account, please add bank account."));
        }
      } else {
        snackbar.warning(t("You haven't setup your bank account, please add bank account."));
      }
    },
  });

  const { run: updateUserBank, loading: updating } = useRequest(UpdateUserBankService, {
    onSuccess(res) {
      if (res.statusCode === 0) {
        getUserBank();
        snackbar.success(t('Update user bank successful'));
      } else {
        snackbar.warning(res.msg || t('Update user bank failed'));
      }
    },
    onError(error) {
      snackbar.warning(error.message || t('Update user bank failed'));
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit(values) {
      updateUserBank(values);
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

  const handleGoToChangePasswordPage = useCallback(() => {
    history.push('/account/password');
  }, [history]);

  const handleGoToUserWalletPage = useCallback(() => {
    history.push('/account/wallet');
  }, [history]);

  useMount(() => {
    getUserBank();
  });

  useUpdateEffect(() => {
    if (bankDetails) {
      formik.setFieldValue('payTypeId', bankDetails.payType.id || 1);
      formik.setFieldValue('field1value', bankDetails.field1value);
      formik.setFieldValue('field2value', bankDetails.field2value);
      formik.setFieldValue('field3value', bankDetails.field3value);
      formik.setFieldValue('field4value', bankDetails.field4value);
      formik.setFieldValue('field5value', bankDetails.field5value);
      formik.setFieldValue('usernotes', bankDetails.usernotes);
    }
  }, [bankDetails]);

  return (
    <Grid container direction={direction} spacing={2} className={classes.container}>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
        <Paper>
          <List component="nav" aria-label={t('User Center')}>
            <ListItem onClick={handleGoToUserProfilePage} button>
              <ListItemIcon>
                <PersonOutlineIcon />
              </ListItemIcon>
              <ListItemText primary={t('User Profile')} />
            </ListItem>
            <ListItem onClick={handleGoToUserWalletPage} button>
              <ListItemIcon>
                <AccountBalanceWalletOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={t('User Wallet')} />
            </ListItem>
            <ListItem className={classes.active} button>
              <ListItemIcon>
                <AccountBalanceOutlinedIcon color="primary" />
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
            {t('Bank Details')}
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              id="payTypeId"
              name="payTypeId"
              label={t('Pay Type ID')}
              variant="outlined"
              value={formik.values.payTypeId}
              onChange={formik.handleChange}
              className={classes.hidden}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <Grid spacing={2} container>
              <Grid xs={12} item>
                <TextField
                  id="field1value"
                  name="field1value"
                  variant="outlined"
                  label={t(payType.field1name as string)}
                  value={formik.values.field1value}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  id="field2value"
                  name="field2value"
                  variant="outlined"
                  label={t(payType.field2name as string)}
                  value={formik.values.field2value}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  id="field3value"
                  name="field3value"
                  variant="outlined"
                  label={t(payType.field3name as string)}
                  value={formik.values.field3value}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  id="field4value"
                  name="field4value"
                  variant="outlined"
                  label={t(payType.field4name as string)}
                  value={formik.values.field4value}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  id="field5value"
                  name="field5value"
                  variant="outlined"
                  label={t(payType.field5name as string)}
                  value={formik.values.field5value}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  id="usernotes"
                  name="usernotes"
                  variant="outlined"
                  label={t('Notes')}
                  value={formik.values.usernotes}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              className={classes.submit}
            >
              {loading || updating ? t('Changing...') : t('Change Bank Details')}
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BankDetailsPage;
