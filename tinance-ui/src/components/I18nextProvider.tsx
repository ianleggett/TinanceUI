import { useMount } from 'ahooks';
import dayjs from 'dayjs';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import type { Dispatch } from 'react';
import { I18nextProvider as BaseI18nextProvider, initReactI18next } from 'react-i18next';

import type { AppLang } from '../constants';
import resources from '../locales';
import type { AppConfigAction } from './AppConfig';

const defaultProps = {
  fallbackLng: 'en-US' as AppLang,
};

export interface I18nextProviderProps {
  fallbackLng?: AppLang;
  dispatch: Dispatch<AppConfigAction>;
  children: React.ReactNode;
}

type DefaultProps = typeof defaultProps;
type PropsWithDefault = I18nextProviderProps & DefaultProps;

export const I18nextProvider: React.FC<I18nextProviderProps> = (props) => {
  const { fallbackLng, dispatch, children } = props as PropsWithDefault;

  useMount(() => {
    i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        debug: process.env.NODE_ENV !== 'production',
        fallbackLng,
        resources,
        defaultNS: 'base',
        keySeparator: false,
        detection: {
          lookupQuerystring: 'lang',
          lookupLocalStorage: 'lang',
          caches: ['localStorage'],
          order: ['querystring', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
        },
      });

    dispatch({
      type: 'update',
      payload: {
        lang: i18n.language as AppLang,
      },
    });

    if (i18n.language.startsWith('en')) {
      dayjs.locale('en');
    } else if (i18n.language.startsWith('vi')) {
      dayjs.locale('vi');
    } else {
      dayjs.locale(i18n.language.toLowerCase());
    }
  });

  return <BaseI18nextProvider i18n={i18n}>{children}</BaseI18nextProvider>;
};

I18nextProvider.defaultProps = defaultProps;
