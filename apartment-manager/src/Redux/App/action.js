export const SET_ERROR = "SET_ERROR";

export const setError = (message) => ({
  type: SET_ERROR,
  payload: message,
});
