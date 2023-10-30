import Container from '@material-ui/core/Container';
import { useMount, useRequest, useUpdateEffect } from 'ahooks';
import type { Dispatch } from 'react';
import { createContext, Suspense, useContext, useReducer } from 'react';

import { appConfig } from '../constants';
import {
  GetCCYCodesService,
  GetNetworkConfigService,
  GetNetworkProfileService,
  GetPaymentTypesService,
  GetValidationRegexService,
} from '../services';
import { snackbar } from '../utils';
import { GlobalFooter } from './GlobalFooter';
import { GlobalHeader } from './GlobalHeader';
import { I18nextProvider } from './I18nextProvider';
import { useUserManagerState } from './UserManager';

const initialState = appConfig;

export type AppConfigState = typeof initialState;
export type AppConfigAction =
  | { type: 'update'; payload: Partial<AppConfigState> }
  | { type: 'reset' };

const AppConfigStateContext = createContext<AppConfigState | undefined>(undefined);
const AppConfigDispatchContext = createContext<Dispatch<AppConfigAction> | undefined>(undefined);

const reducer = (state: AppConfigState, action: AppConfigAction): AppConfigState => {
  switch (action.type) {
    case 'update': {
      return {
        ...state,
        ...action.payload,
      };
    }

    case 'reset': {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

/**
 * Get and save public data to config context.
 *
 * @param dispatch - Util for saving public data to config context.
 */
async function getAndSavePublicData(dispatch: Dispatch<AppConfigAction>) {
  try {
    const [ccyCodes, paymentTypes, validationRegex] = await Promise.all([
      await GetCCYCodesService(),
      await GetPaymentTypesService(),
      await GetValidationRegexService(),
    ]);

    dispatch({
      type: 'update',
      payload: {
        ccyCodes,
        paymentTypes,
        validationRegex,
      },
    });

    const networkProfile = await GetNetworkProfileService();

    if (networkProfile) {
      dispatch({
        type: 'update',
        payload: {
          networkProfile,
        },
      });
    }
  } catch {
    snackbar.warning('Get public data failed');
  }
}

export interface AppConfigProviderProps extends Partial<AppConfigState> {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal;
}

export const AppConfigProvider: React.FC<AppConfigProviderProps> = (props) => {
  const { children, ...restProps } = props;
  const [state, dispatch] = useReducer(reducer, { ...initialState, ...restProps });
  const { title, lang, logo, maxWidth, networkProfile } = state;
  const { isLoggedIn } = useUserManagerState();

  const { run: getNetworkConfig } = useRequest(GetNetworkConfigService, {
    onSuccess(res) {
      if (res) {
        dispatch({
          type: 'update',
          payload: {
            networkConfig: res,
          },
        });
      } else {
        snackbar.warning('Get network config failed');
      }
    },
    onError(error) {
      snackbar.warning(error.message || 'Get network config failed');
    },
  });

  useMount(async () => {
    await getAndSavePublicData(dispatch);
  });

  useUpdateEffect(() => {
    if (isLoggedIn) {
      getNetworkConfig();
    }
  }, [isLoggedIn]);

  return (
    <AppConfigStateContext.Provider value={state}>
      <AppConfigDispatchContext.Provider value={dispatch}>
        <Suspense fallback="Loading...">
          <I18nextProvider fallbackLng={state.lang} dispatch={dispatch}>
            <GlobalHeader title={title} logo={logo} maxWidth={maxWidth} network={networkProfile} />
            <Container
              component="main"
              maxWidth={maxWidth}
              style={{
                flex: 1,
                marginBottom: 32,
              }}
            >
              {children}
            </Container>
            <GlobalFooter
              title={title}
              lang={lang}
              startYear={2020}
              maxWidth={maxWidth}
              dispatch={dispatch}
            />
          </I18nextProvider>
        </Suspense>
      </AppConfigDispatchContext.Provider>
    </AppConfigStateContext.Provider>
  );
};

export const useAppConfigState = (): AppConfigState => {
  const context = useContext(AppConfigStateContext);

  if (context === undefined) {
    throw new Error('useAppConfigState should be used within a AppConfigProvider');
  }

  return context;
};

export const useAppConfigDispatch = (): Dispatch<AppConfigAction> => {
  const context = useContext(AppConfigDispatchContext);

  if (context === undefined) {
    throw new Error('useAppConfigDispatch should be used within a AppConfigProvider');
  }

  return context;
};

export const useAppConfig = (): [AppConfigState, Dispatch<AppConfigAction>] => {
  return [useAppConfigState(), useAppConfigDispatch()];
};
