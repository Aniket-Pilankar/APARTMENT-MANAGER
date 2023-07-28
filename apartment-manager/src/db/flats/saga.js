import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchFlatBySort,
  fetchFlatBySortSuccess,
  fetchFlats,
  fetchFlatSuccess,
} from "./action";
import { getAllFlats, getAllFlatsSorted } from "./api";

function* fetchFlatsWorkers(action) {
  try {
    const result = yield call(getAllFlats, action.payload);
    yield put(fetchFlatSuccess(result));
  } catch (error) {
    console.log("error:", error);
  }
}

function* fetchFlatBySortWorkers(action) {
  try {
    const result = yield call(getAllFlatsSorted, action.payload);
    yield put(fetchFlatBySortSuccess(result));
    return action.payload.res(result);
  } catch (error) {
    console.log("error:", error);
  }
}

export function* flatSaga() {
  yield takeLatest(fetchFlats().type, fetchFlatsWorkers);
  yield takeLatest(fetchFlatBySort().type, fetchFlatBySortWorkers);
}
