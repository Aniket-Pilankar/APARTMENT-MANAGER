import { fork } from "redux-saga/effects";
import flatDetailsSaga from "./flatDetails";
import authSaga from "./authSaga";

export default function* rootSaga() {
  yield fork(flatDetailsSaga);
  yield fork(authSaga);
}
