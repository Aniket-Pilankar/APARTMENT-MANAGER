import { fork } from "redux-saga/effects";
import authSaga from "../db/auth/authSaga";
import { flatSaga } from "../db/flats/saga";
import { residentSaga } from "../db/residents/saga";

export default function* rootSaga() {
  yield fork(authSaga);
  yield fork(flatSaga);
  yield fork(residentSaga);
}
