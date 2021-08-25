import { useMount, useUnmount, useUpdateEffect } from 'ahooks';
import type { Dispatch } from 'react';
import { createContext, useCallback, useContext, useReducer } from 'react';

import { GetUserDetailsService } from '../services';
import { clearProfile, getProfile, getToken, saveProfile, snackbar } from '../utils';

const initialState = {
  isLoggedIn: false,
  profile: undefined as User.Model | undefined,
};

export type UserManagerState = typeof initialState;
export type UserManagerAction =
  | { type: 'saveUserInfo'; payload: User.Model }
  | { type: 'clearUserInfo' }
  | { type: 'reset' };

const UserManagerStateContext = createContext<UserManagerState | undefined>(undefined);
const UserManagerDispatchContext = createContext<Dispatch<UserManagerAction> | undefined>(
  undefined,
);

const reducer = (state: UserManagerState, action: UserManagerAction): UserManagerState => {
  switch (action.type) {
    case 'saveUserInfo': {
      return {
        ...state,
        isLoggedIn: true,
        profile: action.payload,
      };
    }

    case 'clearUserInfo': {
      return {
        ...state,
        isLoggedIn: false,
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

/**
 * Request user profile with server data.
 *
 * @param dispatch - Util for saving user profile to context.
 */
async function requestRemoteUserProfile(dispatch: Dispatch<UserManagerAction>) {
  try {
    const profile = await GetUserDetailsService();

    if (profile.cid) {
      saveProfile(profile);

      dispatch({
        type: 'saveUserInfo',
        payload: profile,
      });
    } else {
      snackbar.warning('Get user profile failed');
    }
  } catch {
    snackbar.warning('Get user profile failed');
  }
}

export interface UserManagerProviderProps {
  loginRequired?: boolean;
}

export const UserManagerProvider: React.FC<UserManagerProviderProps> = (props) => {
  const { loginRequired, children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleTokenExpired = useCallback(() => {
    dispatch({ type: 'clearUserInfo' });
  }, []);

  useMount(() => {
    const token = getToken();

    document.addEventListener('tokenexpired', handleTokenExpired);

    if (token) {
      const profile = getProfile();

      if (profile !== undefined) {
        dispatch({
          type: 'saveUserInfo',
          payload: profile,
        });
      }
    } else {
      clearProfile();
    }
  });

  useUpdateEffect(() => {
    if (state.isLoggedIn) {
      requestRemoteUserProfile(dispatch);
    }
  }, [state.isLoggedIn]);

  useUnmount(() => {
    dispatch({
      type: 'clearUserInfo',
    });

    document.removeEventListener('tokenexpired', handleTokenExpired);
  });

  return (
    <UserManagerStateContext.Provider value={state}>
      <UserManagerDispatchContext.Provider value={dispatch}>
        {loginRequired && !state.isLoggedIn ? null : children}
      </UserManagerDispatchContext.Provider>
    </UserManagerStateContext.Provider>
  );
};

export interface UserManagerConsumerProps {
  children: React.ReactNode | ((context: UserManagerState) => React.ReactNode);
}

export const UserManagerConsumer: React.FC<UserManagerConsumerProps> = (props) => {
  const { children } = props;

  return (
    <UserManagerStateContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error('UserManagerConsumer should be used within a UserManagerProvider');
        }

        return typeof children === 'function' ? children(context) : children;
      }}
    </UserManagerStateContext.Consumer>
  );
};

export const useUserManagerState = (): UserManagerState => {
  const context = useContext(UserManagerStateContext);

  if (context === undefined) {
    throw new Error('useUserManagerState should be used within a UserManagerProvider');
  }

  return context;
};

export const useUserManagerDispatch = (): Dispatch<UserManagerAction> => {
  const context = useContext(UserManagerDispatchContext);

  if (context === undefined) {
    throw new Error('useUserManagerDispatch should be used within a UserManagerProvider');
  }

  return context;
};

export const useUserManager = (): [UserManagerState, Dispatch<UserManagerAction>] => {
  return [useUserManagerState(), useUserManagerDispatch()];
};
