import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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

import { GetUserBankService, UpdateUserBankService } from '../services';

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
  payTypeId: 0,
  field1value: '',
  field2value: '',
  field3value: '',
  field4value: '',
  field5value: '',
};

const BankDetailsPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [bankDetails, setBankDetails] = useState<Record<string, any> | null>(null);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const direction = useMemo(() => (matches ? 'row' : 'column'), [matches]);

  const validationSchema = useCallback(() => {
    return yup.lazy((values: typeof initialValues) => yup.object({}));
  }, []);

  const { run: getUserBank } = useRequest(GetUserBankService, {
    onSuccess(res) {
      if (res.id) {
        setBankDetails(res);
      } else {
        enqueueSnackbar(res.msg || t('Get user bank failed'), {
          variant: 'warning',
        });
      }
    },
  });

  const { run: updateUserBank, loading } = useRequest(UpdateUserBankService, {
    onSuccess(res) {
      if (res.statusCode === 0) {
        getUserBank();
      } else {
        enqueueSnackbar(res.msg || t('Update user bank failed'), {
          variant: 'warning',
        });
      }
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
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              className={classes.submit}
            >
              {loading ? t('Changing...') : t('Change Bank Details')}
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BankDetailsPage;
