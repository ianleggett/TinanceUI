import Container from '@material-ui/core/Container';
import type { Dispatch } from 'react';
import { createContext, useContext, useReducer } from 'react';

import { appConfig } from '../constants';
import { GlobalFooter } from './GlobalFooter';
import { GlobalHeader } from './GlobalHeader';

const initialState = appConfig;

export type AppContextState = typeof initialState;

export type AppContextAction =
  | { type: 'update'; payload: Partial<AppContextState> }
  | { type: 'reset' };

export interface AppContextProviderProps extends Partial<AppContextState> {
  children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal;
}

const reducer = (state: AppContextState, action: AppContextAction): AppContextState => {
  switch (action.type) {
    case 'update': {
      return {
        ...initialState,
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

const LayoutStateContext = createContext<AppContextState | undefined>(undefined);
const LayoutDispatchContext = createContext<Dispatch<AppContextAction> | undefined>(undefined);

export const AppContextProvider: React.FC<AppContextProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, { ...initialState, ...props });
  const { title, logo, maxWidth, privacy, terms } = state;

  return (
    <LayoutStateContext.Provider value={state}>
      <LayoutDispatchContext.Provider value={dispatch}>
        <GlobalHeader title={title} logo={logo} maxWidth={maxWidth} />
        <Container component="main" maxWidth={maxWidth} style={{ flex: 1 }} disableGutters>
          {children}
        </Container>
        <GlobalFooter
          title={title}
          startYear={2020}
          maxWidth={maxWidth}
          privacy={privacy}
          terms={terms}
        />
      </LayoutDispatchContext.Provider>
    </LayoutStateContext.Provider>
  );
};

export const useAppState = (): AppContextState => {
  const context = useContext(LayoutStateContext);

  if (context === undefined) {
    throw new Error('useAppState must be used within a AppContextProvider');
  }

  return context;
};

export const useAppDispatch = (): Dispatch<AppContextAction> => {
  const context = useContext(LayoutDispatchContext);

  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a AppContextProvider');
  }

  return context;
};

export const useAppContext = (): [AppContextState, Dispatch<AppContextAction>] => {
  return [useAppState(), useAppDispatch()];
};
