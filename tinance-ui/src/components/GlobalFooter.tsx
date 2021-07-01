import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
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
    right: {
      display: 'flex',
      alignItems: 'center',
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
      dayjs.locale(key.startsWith('en') ? 'en' : key.toLowerCase());
      setLanguageMenu(null);
    },
    [dispatch, i18n],
  );

  return (
    <Container component="footer" maxWidth={maxWidth} className={classes.root}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle2">
          &copy; {years} {title} {t('All rights reserved')}.
        </Typography>
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
      </Box>
    </Container>
  );
};

GlobalFooter.defaultProps = defaultProps;
