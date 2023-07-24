import { call, put, takeLatest } from "redux-saga/effects";
import {
  checkSignupEmail,
  checkSignupEmailSuccess,
  setUserSession,
  setUserSessionSuccess,
} from "../Redux/auth/action";
import { clearSession, setSession } from "../Redux/auth/session";
import { checkSignupEmail as checkSignupEmailAPI } from "../utils/api";

function* setUserSessionWorker(action) {
  try {
    const { session } = action.payload;
    if (session) {
      yield call(setSession, session);
      yield put(setUserSessionSuccess(session));
    } else yield call(clearSession());
  } catch (error) {
    console.log("error:", error);
  }
}

function* checkSignupEmailWorker(action) {
  console.log("action:checkSignupEmailWorker", action);
  try {
    const response = yield call(checkSignupEmailAPI, action.payload);
    console.log("response:", response);

    const {
      token,
      // eslint-disable-next-line no-unused-vars
      user: { email, name, ...restUserData },
    } = response.data;

    const updatedSession = {
      token,
      email,
      name,
    };

    yield put(setUserSession({ session: updatedSession }));
    yield put(checkSignupEmailSuccess(updatedSession));
  } catch (err) {
    console.log("err:", err);
  }
}

export default function* authSaga() {
  yield takeLatest(setUserSession().type, setUserSessionWorker);
  yield takeLatest(checkSignupEmail().type, checkSignupEmailWorker);
}
