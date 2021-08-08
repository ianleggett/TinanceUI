import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import NetworkCellOutlinedIcon from '@material-ui/icons/NetworkCellOutlined';
import { useWeb3React } from '@web3-react/core';
import { useRequest } from 'ahooks';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { SignOutService } from '../services';
import { clearProfile, clearToken, snackbar } from '../utils';
import { useUserManager } from './UserManager';

const useStyles = makeStyles((theme) => {
  return createStyles({
    root: {
      flex: '0 0 64px',
      background: theme.palette.background.paper,
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
    menuItem: {
      minWidth: 36,
    },
    drawer: {
      '& .MuiDrawer-paperAnchorLeft': {
        width: '62vw',
      },
    },
    buttons: {
      '& > * + *': {
        margin: theme.spacing(1),
      },
    },
    avatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
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
  network?: PublicData.NetworkProfile;
}

type DefaultProps = typeof defaultProps;
type PropsWithDefault = GlobalHeaderProps & DefaultProps;

export const GlobalHeader: React.FC<GlobalHeaderProps> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [{ profile }, dispatch] = useUserManager();
  const [showDrawer, setShowDrawer] = useState(false);
  const [userMenu, setUserMenu] = useState<HTMLButtonElement | null>(null);
  const { title, logo, maxWidth, network } = props as PropsWithDefault;
  const { active, error, deactivate } = useWeb3React();

  const { run: signout } = useRequest(SignOutService, {
    onSuccess(res) {
      if (res.statusCode === 0) {
        snackbar.success(t('Sign out successful'));
      } else {
        snackbar.warning(res.msg || t('Sign out failed'));
      }
    },
  });

  const handleDrawerOpen = useCallback(() => {
    setShowDrawer(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setShowDrawer(false);
  }, []);

  const handleUserMenuOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setUserMenu(event.currentTarget);
  }, []);

  const handleUserMenuClose = useCallback(() => {
    setUserMenu(null);
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

  const handleGoToConnectPage = useCallback(() => {
    history.push('/connect');
    setShowDrawer(false);
  }, [history]);

  const handleGoToSigninPage = useCallback(() => {
    history.push('/signin');
  }, [history]);

  const handleGoToSignUpPage = useCallback(() => {
    history.push('/signup');
  }, [history]);

  const handleGoToProfilePage = useCallback(() => {
    setUserMenu(null);
    history.push('/account/profile');
  }, [history]);

  const handleGoToUserWalletPage = useCallback(() => {
    setUserMenu(null);
    history.push('/account/wallet');
  }, [history]);

  const handleGoToBankDetailsPage = useCallback(() => {
    setUserMenu(null);
    history.push('/account/bank-details');
  }, [history]);

  const handleGoToChangePasswordPage = useCallback(() => {
    setUserMenu(null);
    history.push('/account/password');
  }, [history]);

  const handleSignOut = useCallback(() => {
    setUserMenu(null);
    deactivate();
    signout();
    dispatch({
      type: 'clearUserInfo',
    });

    clearToken();
    clearProfile();

    history.replace('/');
  }, [dispatch, history, signout, deactivate]);

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
                {t('Markets')}
              </Button>
              <Button
                variant="text"
                color={pathname.startsWith('/offers') ? 'primary' : 'default'}
                onClick={handleGoToOffersPage}
              >
                {t('Offers')}
              </Button>
              <Button
                variant="text"
                color={pathname.startsWith('/trades') ? 'primary' : 'default'}
                onClick={handleGoToTradesPage}
              >
                {t('Trades')}
              </Button>
              <Button
                variant="text"
                color={pathname.startsWith('/connect') ? 'primary' : 'default'}
                onClick={handleGoToConnectPage}
              >
                {active
                  ? `🟢 ${t('Connected')}`
                  : error
                  ? `🔴 ${t('Error')}`
                  : `🟠 ${t('Not Connected')}`}
              </Button>
              {network ? <Chip color="primary" label={network.value} /> : null}
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
              </List>
            </SwipeableDrawer>
          </Hidden>

          <Box display="flex" alignItems="center" className={classes.buttons}>
            {profile ? (
              <>
                <Tooltip title={t('User Center') as string} enterDelay={300} arrow>
                  <Button
                    color="inherit"
                    aria-haspopup="true"
                    aria-owns="user-menu"
                    startIcon={<Avatar alt={profile.username} className={classes.avatar} />}
                    endIcon={<ExpandMoreOutlinedIcon />}
                    onClick={handleUserMenuOpen}
                  >
                    {profile.username}
                  </Button>
                </Tooltip>
                <Menu
                  id="user-menu"
                  anchorEl={userMenu}
                  open={Boolean(userMenu)}
                  onClose={handleUserMenuClose}
                >
                  <MenuItem key="profile" onClick={handleGoToProfilePage}>
                    {t('User Profile')}
                  </MenuItem>
                  <MenuItem key="wallet" onClick={handleGoToUserWalletPage}>
                    {t('User Wallet')}
                  </MenuItem>
                  <MenuItem key="bank-details" onClick={handleGoToBankDetailsPage}>
                    {t('Bank Details')}
                  </MenuItem>
                  <MenuItem key="password" onClick={handleGoToChangePasswordPage}>
                    {t('Change Password')}
                  </MenuItem>
                  <MenuItem key="signout" onClick={handleSignOut}>
                    {t('Sign Out')}
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                color="primary"
                variant="contained"
                onClick={pathname === '/signin' ? handleGoToSignUpPage : handleGoToSigninPage}
              >
                {pathname === '/signin' ? t('Sign Up') : t('Sign In')}
              </Button>
            )}

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
