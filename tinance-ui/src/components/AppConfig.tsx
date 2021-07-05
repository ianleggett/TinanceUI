import Container from '@material-ui/core/Container';
import { useMount } from 'ahooks';
import type { Dispatch } from 'react';
import { createContext, Suspense, useContext, useReducer } from 'react';

import { appConfig } from '../constants';
import { GetCCYCodesService, GetPaymentTypesService } from '../services';
import { GlobalFooter } from './GlobalFooter';
import { GlobalHeader } from './GlobalHeader';
import { I18nextProvider } from './I18nextProvider';

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
  const [ccyCodes, paymentTypes] = await Promise.all([
    await GetCCYCodesService(),
    await GetPaymentTypesService(),
  ]);

  dispatch({
    type: 'update',
    payload: {
      ccyCodes,
      paymentTypes,
    },
  });
}

export interface AppConfigProviderProps extends Partial<AppConfigState> {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal;
}

export const AppConfigProvider: React.FC<AppConfigProviderProps> = (props) => {
  const { children, ...restProps } = props;
  const [state, dispatch] = useReducer(reducer, { ...initialState, ...restProps });
  const { title, lang, logo, maxWidth } = state;

  useMount(async () => {
    await getAndSavePublicData(dispatch);
  });

  return (
    <AppConfigStateContext.Provider value={state}>
      <AppConfigDispatchContext.Provider value={dispatch}>
        <Suspense fallback="Loading...">
          <I18nextProvider fallbackLng={state.lang} dispatch={dispatch}>
            <GlobalHeader title={title} logo={logo} maxWidth={maxWidth} />
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
