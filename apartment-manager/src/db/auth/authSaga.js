import {
  call,
  put,
  putResolve,
  takeLatest,
  takeLeading,
} from "redux-saga/effects";
import {
  checkSignupEmail,
  checkSignupEmailSuccess,
  setUserSession,
  setUserSessionSuccess,
  tryLogin,
  tryLoginSuccess,
  tryLogout,
  tryLogoutSuccess,
} from "./action";
import { clearSession, setSession } from "./session";
import {
  checkSignupEmail as checkSignupEmailAPI,
  login,
} from "./api";

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

    const {
      // eslint-disable-next-line no-unused-vars
      user: { email, name, _id, ...restUserData },
    } = response.data;

    const updatedSession = {
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
    // const session = yield select(selectAuthSession);
    // if (!session) return;

    const result = yield call(login, action.payload);
    console.log("result:", result);

    const { token } = result;
    const { password, ...restUserDetails } = result.user;

    const updatedSession = {
      ...restUserDetails,
      token,
    };

    yield put(setUserSession({ session: updatedSession }));
    yield put(tryLoginSuccess(updatedSession));
    return action.payload.res(true);
  } catch (error) {
    console.log("error:", error);
  }
}

function* tryLogoutWorker() {
  try {
    yield putResolve(tryLogoutSuccess());
    yield put(setUserSession({ session: null }));
  } catch (error) {
    console.log("error:", error);
  }
}

export default function* authSaga() {
  yield takeLatest(setUserSession().type, setUserSessionWorker);
  yield takeLatest(checkSignupEmail().type, checkSignupEmailWorker);
  yield takeLatest(tryLogin().type, tryLoginWorker);
  yield takeLeading(tryLogout().type, tryLogoutWorker);
}
