import {
  AppBar,
  Box,
  Button,
  Container,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import { useCallback, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => {
  return createStyles({
    root: {
      flex: '0 0 64px',
    },
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
    menu: {
      '& > * + *': {
        margin: theme.spacing(1),
      },
    },
    drawer: {
      '& .MuiDrawer-paperAnchorLeft': {
        width: '38vw',
      },
    },
    buttons: {
      '& > * + *': {
        margin: theme.spacing(1),
      },
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
  const { pathname } = useLocation();
  const [showDrawer, setShowDrawer] = useState(false);
  const { title, logo, maxWidth } = props as PropsWithDefault;

  const handleDrawerOpen = useCallback(() => {
    setShowDrawer(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setShowDrawer(false);
  }, []);

  const handleGoToMarketsPage = useCallback(() => {
    history.push('/markets');
    setShowDrawer(false);
  }, [history]);

  const handleGoToOffersPage = useCallback(() => {
    history.push('/offers');
    setShowDrawer(false);
  }, [history]);

  const handleGoToTradesPage = useCallback(() => {
    history.push('/trades');
    setShowDrawer(false);
  }, [history]);

  const handleGoToSigninPage = useCallback(() => {
    history.push('/signin');
  }, [history]);

  return (
    <AppBar position="static" color="transparent" variant="outlined" className={classes.root}>
      <Container maxWidth={maxWidth} disableGutters>
        <Toolbar className={classes.toolbar}>
          <Link to="/" className={classes.brand}>
            <img src={logo} alt={title} width={32} height={32} className={classes.logo} />
            <Typography component="h1" variant="h6" color="primary">
              {title}
            </Typography>
          </Link>
          <Hidden only={['sm', 'xs']}>
            <Box className={classes.menu}>
              <Button
                variant="text"
                color={pathname.startsWith('/markets') ? 'primary' : 'default'}
                onClick={handleGoToMarketsPage}
              >
                Markets
              </Button>
              <Button
                variant="text"
                color={pathname.startsWith('/offers') ? 'primary' : 'default'}
                onClick={handleGoToOffersPage}
              >
                Offers
              </Button>
              <Button
                variant="text"
                color={pathname.startsWith('/trades') ? 'primary' : 'default'}
                onClick={handleGoToTradesPage}
              >
                Trades
              </Button>
              <Button variant="text" endIcon={<ExpandMoreOutlinedIcon />}>
                More
              </Button>
            </Box>
          </Hidden>

          <Hidden mdUp>
            <SwipeableDrawer
              anchor="left"
              open={showDrawer}
              onClose={handleDrawerClose}
              onOpen={handleDrawerOpen}
              className={classes.drawer}
            >
              <List component="nav" aria-label="Main Menu">
                <ListItem button divider>
                  <ListItemIcon>
                    <AccountBalanceOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Markets" onClick={handleGoToMarketsPage} />
                </ListItem>
                <ListItem button divider>
                  <ListItemIcon>
                    <AttachMoneyOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Offers" onClick={handleGoToOffersPage} />
                </ListItem>
                <ListItem button divider>
                  <ListItemIcon>
                    <AttachMoneyOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Trades" onClick={handleGoToTradesPage} />
                </ListItem>
                <ListItem button divider>
                  <ListItemIcon>
                    <MoreHorizOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="More" />
                </ListItem>
              </List>
            </SwipeableDrawer>
          </Hidden>

          <Box className={classes.buttons}>
            <Button color="primary" variant="contained" onClick={handleGoToSigninPage}>
              Sign In
            </Button>
            <Hidden mdUp>
              <IconButton color="primary" aria-label="Open Menu" onClick={handleDrawerOpen}>
                <MenuOutlinedIcon />
              </IconButton>
            </Hidden>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

GlobalHeader.defaultProps = defaultProps;
