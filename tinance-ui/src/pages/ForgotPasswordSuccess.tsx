import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '64px 0',
    padding: '32px 16px',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  email: {
    display: 'block',
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    textDecoration: 'underline',
  },
}));

const ForgotPasswordSuccessPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { search } = useLocation();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const emailRef = useRef(new URLSearchParams(search).get('email') ?? '');

  useEffect(() => {
    if (!emailRef.current) {
      history.replace('/');
      enqueueSnackbar(t("There's no email url query string in the URL"), {
        variant: 'warning',
      });
    }
  }, [enqueueSnackbar, history, t]);

  return (
    <Container maxWidth="sm" disableGutters>
      <Paper className={classes.root}>
        <Typography component="h2" variant="h4" color="primary" className={classes.title}>
          {t('Check Your Email')}
        </Typography>
        <Link
          variant="subtitle1"
          color="secondary"
          href={`mailto:${emailRef.current}`}
          target="_blank"
          className={classes.email}
          rel="noreferrer"
        >
          {emailRef.current}
        </Link>
        <Typography component="p" variant="body1">
          {t(
            'We have sent an reset link to your email, please check your email, then reset password with the instruction in the email.',
          )}
        </Typography>
      </Paper>
    </Container>
  );
};

export default ForgotPasswordSuccessPage;
