import type { Dispatch } from 'react';
import { createContext, useContext, useEffect, useReducer } from 'react';

import { getProfile } from '../utils';

const initialState = {
  profile: undefined as User.Model | undefined,
};

export type UserContextState = typeof initialState;

export type UserContextAction =
  | { type: 'saveUserInfo'; payload: User.Model }
  | { type: 'clearUserInfo' }
  | { type: 'reset' };

export interface UserContextProviderProps {}

const reducer = (state: UserContextState, action: UserContextAction): UserContextState => {
  switch (action.type) {
    case 'saveUserInfo': {
      return {
        ...state,
        profile: action.payload,
      };
    }

    case 'clearUserInfo': {
      return {
        ...state,
        profile: undefined,
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

const UserStateContext = createContext<UserContextState | undefined>(undefined);
const UserDispatchContext = createContext<Dispatch<UserContextAction> | undefined>(undefined);

export const UserContextProvider: React.FC<UserContextProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const cachedProfile = getProfile();

    if (cachedProfile) {
      dispatch({
        type: 'saveUserInfo',
        payload: cachedProfile,
      });
    }

    return () => {
      dispatch({ type: 'clearUserInfo' });
    };
  }, []);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useUserState = (): UserContextState => {
  const context = useContext(UserStateContext);

  if (context === undefined) {
    throw new Error('useUserState must be used within a UserContextProvider');
  }

  return context;
};

export const useUserDispatch = (): Dispatch<UserContextAction> => {
  const context = useContext(UserDispatchContext);

  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserContextProvider');
  }

  return context;
};

export const useUserContext = (): [UserContextState, Dispatch<UserContextAction>] => {
  return [useUserState(), useUserDispatch()];
};
