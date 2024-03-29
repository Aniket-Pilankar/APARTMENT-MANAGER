import {
  SET_USER_SESSION_SUCCESS,
  TRY_LOGIN_SUCCESS,
  TRY_LOGOUT_SUCCESS,
} from "./action";
import { getSession } from "./session";

const getInitialSession = () => {
  const sessionWithIsAuthenticated = getSession();

  if (!sessionWithIsAuthenticated) return null;

  const { password, ...userSession } = sessionWithIsAuthenticated;
  return userSession;
};

const initialState = {
  session: getInitialSession(),
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_SESSION_SUCCESS:
      return {
        ...state,
        session: payload,
      };

    case TRY_LOGIN_SUCCESS:
      return {
        ...state,
        session: {
          ...state.session,
          ...payload,
        },
      };
    case TRY_LOGOUT_SUCCESS:
      return {
        ...state,
        session: null,
      };
    default:
      return state;
  }
};
