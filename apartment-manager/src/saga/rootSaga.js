import { fork } from "redux-saga/effects";
import flatDetailsSaga from "./flatDetails";
import authSaga from "../db/auth/authSaga";
import { flatSaga } from "../db/flats/saga";

export default function* rootSaga() {
  yield fork(flatDetailsSaga);
  yield fork(authSaga);
  yield fork(flatSaga);
}
