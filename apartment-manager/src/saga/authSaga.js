import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  checkSignupEmail,
  checkSignupEmailSuccess,
  setUserSession,
  setUserSessionSuccess,
  tryLogin,
  tryLoginSuccess,
} from "../Redux/auth/action";
import { selectAuthSession } from "../Redux/auth/selector";
import { clearSession, setSession } from "../Redux/auth/session";
import { checkSignupEmail as checkSignupEmailAPI, login } from "../utils/api";

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
      user: { email, name, _id, ...restUserData },
    } = response.data;

    const updatedSession = {
      token,
      email,
      name,
      userId: _id,
    };

    yield put(setUserSession({ session: updatedSession }));
    yield put(checkSignupEmailSuccess(updatedSession));
    return action.payload.res(updatedSession);
    // return new Promise((resolve) => resolve(updatedSession));
  } catch (err) {
    return action.payload.rej(err);
  }
}

function* tryLoginWorker(action) {
  try {
    const session = yield select(selectAuthSession);
    if (!session) return;

    const result = yield call(login, action.payload);
    console.log("result:", result);

    const { token } = result;

    const updatedSession = {
      ...session,
      token,
    };

    yield put(setUserSession({ session: updatedSession }));
    yield put(tryLoginSuccess(updatedSession));
    return action.payload.res(true);
  } catch (error) {
    console.log("error:", error);
  }
}

export default function* authSaga() {
  yield takeLatest(setUserSession().type, setUserSessionWorker);
  yield takeLatest(checkSignupEmail().type, checkSignupEmailWorker);
  yield takeLatest(tryLogin().type, tryLoginWorker);
}
