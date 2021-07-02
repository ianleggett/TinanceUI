import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import LanguageOutlinedIcon from '@material-ui/icons/LanguageOutlined';
import dayjs from 'dayjs';
import type { Dispatch } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import type { AppLang } from '../constants';
import { languages } from '../constants';
import type { AppConfigAction } from './AppConfig';

const useStyles = makeStyles((theme) => {
  return createStyles({
    root: {
      flex: '0 0 54px',
      padding: 16,
      borderTop: `1px solid ${theme.palette.divider}`,
    },
    left: {
      textAlign: 'left',
      lineHeight: '30px',
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
      },
    },
    right: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
      },
    },
    divider: {
      margin: '0 8px',
      height: 10,
    },
  });
});

const defaultProps = {
  maxWidth: 'lg' as 'lg' | 'xs' | 'sm' | 'md' | 'xl' | false,
};

export interface GlobalFooterProps {
  title: string;
  lang: AppLang;
  dispatch: Dispatch<AppConfigAction>;
  startYear?: number;
  maxWidth?: 'lg' | 'xs' | 'sm' | 'md' | 'xl' | false;
}

type DefaultProps = typeof defaultProps;
type PropsWithDefault = GlobalFooterProps & DefaultProps;

export const GlobalFooter: React.FC<GlobalFooterProps> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const { title, lang, dispatch, startYear, maxWidth } = props as PropsWithDefault;
  const [languageMenu, setLanguageMenu] = useState<HTMLButtonElement | null>(null);

  const years = useMemo(() => {
    const thisYear = dayjs().year();
    if (!startYear || startYear >= thisYear) {
      return thisYear;
    }
    return `${startYear}-${thisYear}`;
  }, [startYear]);

  const handleGoToPrivacyPage = useCallback(() => {
    history.push('/privacy');
  }, [history]);

  const handleGoToTermsPage = useCallback(() => {
    history.push('/terms');
  }, [history]);

  const handleLanguageMenuOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setLanguageMenu(event.currentTarget);
  }, []);

  const handleLanguageMenuClose = useCallback(() => {
    setLanguageMenu(null);
  }, []);

  const handleChangeLanguage = useCallback(
    (key: string) => {
      dispatch({
        type: 'update',
        payload: {
          lang: key as AppLang,
        },
      });

      i18n.changeLanguage(key);

      if (key.startsWith('en')) {
        dayjs.locale('en');
      } else if (key.startsWith('vi')) {
        dayjs.locale('vi');
      } else {
        dayjs.locale(key.toLowerCase());
      }

      setLanguageMenu(null);
    },
    [dispatch, i18n],
  );

  return (
    <Container component="footer" maxWidth={maxWidth} className={classes.root}>
      <Grid container>
        <Grid xs={12} sm={12} md={6} lg={6} xl={6} item>
          <Typography variant="subtitle2" className={classes.left}>
            &copy; {years} {title} {t('All rights reserved')}.
          </Typography>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={6} xl={6} item>
          <Box className={classes.right}>
            <Button variant="text" color="primary" size="small" onClick={handleGoToPrivacyPage}>
              {t('Privacy Policy')}
            </Button>
            <Divider orientation="vertical" className={classes.divider} />
            <Button variant="text" color="primary" size="small" onClick={handleGoToTermsPage}>
              {t('Terms & Conditions')}
            </Button>
            <Divider orientation="vertical" className={classes.divider} />
            <Tooltip title={t('Change Language') as string} enterDelay={300}>
              <Button
                variant="text"
                color="primary"
                size="small"
                aria-haspopup="true"
                aria-owns="language-menu"
                startIcon={<LanguageOutlinedIcon />}
                onClick={handleLanguageMenuOpen}
              >
                {languages[lang]}
              </Button>
            </Tooltip>
            <Menu
              keepMounted
              id="language-menu"
              anchorEl={languageMenu}
              open={Boolean(languageMenu)}
              onClose={handleLanguageMenuClose}
            >
              {Object.entries(languages).map(([key, value]) => (
                <MenuItem key={key} value={key} onClick={() => handleChangeLanguage(key)}>
                  {value}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

GlobalFooter.defaultProps = defaultProps;
