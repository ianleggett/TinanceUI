import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  subtitle: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(4),
  },
}));

const ForbiddenPage: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const { search } = useLocation();

  const lastpath = useMemo(() => {
    return new URLSearchParams(search).get('from');
  }, [search]);

  const handleGoToHomePage = useCallback(() => {
    history.replace('/');
  }, [history]);

  return (
    <Paper className={classes.root}>
      <Typography color="error" variant="h4">
        403 Forbidden
      </Typography>
      <Typography color="textSecondary" variant="subtitle1" className={classes.subtitle}>
        You have no permission to access path:&nbsp;
        <Typography component="span" color="error">
          <code>{lastpath ?? ''}</code>
        </Typography>
      </Typography>
      <Button
        color="primary"
        variant="outlined"
        className={classes.button}
        startIcon={<HomeOutlinedIcon />}
        onClick={handleGoToHomePage}
      >
        {t('Home Page')}
      </Button>
    </Paper>
  );
};

export default ForbiddenPage;
