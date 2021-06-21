import { AppBar, Button, Container, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => {
  return createStyles({
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    brand: {
      'display': 'flex',
      'alignItems': 'center',
      'color': 'inherit',
      'textDecoration': 'none',
      'lineHeight': 1.5,

      '&:hover': {
        textDecoration: 'none',
      },
    },
    logo: {
      marginRight: theme.spacing(2),
    },
  });
});

const defaultProps = {
  maxWidth: 'lg' as 'lg' | 'xs' | 'sm' | 'md' | 'xl' | false,
};

export interface GlobalHeaderProps {
  title: string;
  logo: string;
  maxWidth?: 'lg' | 'xs' | 'sm' | 'md' | 'xl' | false;
}

type DefaultProps = typeof defaultProps;
type PropsWithDefault = GlobalHeaderProps & DefaultProps;

export const GlobalHeader: React.FC<GlobalHeaderProps> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { title, logo, maxWidth } = props as PropsWithDefault;

  const handleGoToSigninPage = useCallback(() => {
    history.push('/signin');
  }, [history]);

  return (
    <AppBar position="static" color="transparent" variant="outlined">
      <Container maxWidth={maxWidth} disableGutters>
        <Toolbar className={classes.toolbar}>
          <Link to="/" className={classes.brand}>
            <img src={logo} alt={title} width={32} height={32} className={classes.logo} />
            <Typography component="h1" variant="h6" color="primary">
              {title}
            </Typography>
          </Link>
          <Button color="primary" onClick={handleGoToSigninPage}>
            Sign In
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

GlobalHeader.defaultProps = defaultProps;
