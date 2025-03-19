'use client';

import axios from 'axios';
import { useMemo, useEffect, useReducer, useCallback } from 'react';

import { endpoints, getBaseUrl, BaseUrlTypes } from 'src/utils/axios';

import { AuthContext } from './auth-context';
import { setSession, isValidToken } from './utils';
import { AuthUserType, ActionMapType, AuthStateType } from '../../types';
import { jwtDecode } from 'jwt-decode';

// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';
const USER_KEY = 'user';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  };

  const initialize = useCallback(async () => {
    try {
      const accessToken = getCookie(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);

      const decodedToken = jwtDecode(accessToken || '');
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              email: decodedToken?.sub,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const data = {
      email,
      password,
    };
    const res = await axios.post('/api/auth/login', {
      ...data,
    });

    const { token } = res.data;
    document.cookie = `${STORAGE_KEY}=${token}; path=/; max-age=${24 * 60 * 60}`;
    setSession(token);
    const decodedToken = jwtDecode(token || '');
    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          email: decodedToken?.sub,
          token,
        },
      },
    });
  }, []);

  const setLogin = useCallback(async (user: any, accessToken: string) => {
    setSession(accessToken);
    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          ...user,
          accessToken,
        },
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(async (email: string, password: string, fullName: string) => {
    const data = {
      email,
      password,
      fullName,
    };

    const res = await axios.post('/api/auth/signup', { ...data });

    const { token, user } = res.data;
    document.cookie = `${STORAGE_KEY}=${token}; path=/; max-age=${24 * 60 * 60}`;
    sessionStorage.setItem(STORAGE_KEY, token);
    const decodedToken = jwtDecode(token || '');
    dispatch({
      type: Types.REGISTER,
      payload: {
        user: {
          email: decodedToken?.sub,
          token,
        },
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    document.cookie = `${STORAGE_KEY}=; path=/; max-age=0`;
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
      setLogin,
    }),
    [login, logout, register, setLogin, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
