// TODO: make a file action-types
export const CHECK_SIGNUP_EMAIL = "CHECK_SIGNUP_EMAIL";
export const CHECK_SIGNUP_EMAIL_SUCCESS = "CHECK_SIGNUP_EMAIL_SUCCESS";

export const SET_USER_SESSION = "SET_USER_SESSION";
export const SET_USER_SESSION_SUCCESS = "SET_USER_SESSION_SUCCESS";

export const TRY_LOGIN = "TRY_LOGIN";
export const TRY_LOGIN_SUCCESS = "TRY_LOGIN_SUCCESS";

export const setUserSession = (payload) => ({
  type: SET_USER_SESSION,
  payload,
});
export const setUserSessionSuccess = (payload) => ({
  type: SET_USER_SESSION_SUCCESS,
  payload,
});

export const checkSignupEmail = (data) => ({
  type: CHECK_SIGNUP_EMAIL,
  payload: data,
});

export const checkSignupEmailSuccess = (data) => ({
  type: CHECK_SIGNUP_EMAIL_SUCCESS,
  payload: data,
});

export const tryLogin = (payload) => ({
  type: TRY_LOGIN,
  payload,
});

export const tryLoginSuccess = (payload) => ({
  type: TRY_LOGIN_SUCCESS,
  payload,
});
