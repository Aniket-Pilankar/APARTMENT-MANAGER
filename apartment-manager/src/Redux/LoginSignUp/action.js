export const AUTH_STATE = "AUTH_STATE";
export const LOGIN_TOKEN = "LOGIN_TOKEN";
export const LOGIN_DATA = "LOGIN_DATA";

export const authState = (bool) => ({ type: AUTH_STATE, payload: bool });
export const loginToken = (str) => ({ type: LOGIN_TOKEN, payload: str });
// export const loginData= (data) => ({type:LOGIN_DATA,payload:data})
