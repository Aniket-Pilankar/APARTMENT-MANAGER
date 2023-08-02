import { call, put, putResolve, select, takeLatest } from "redux-saga/effects";
import {
  addResident,
  addResidentSuccess,
  fetchFlatDetails,
  fetchFlatDetailsSuccess,
  removeResidentFromFlat,
  removeResidentFromFlatSuccess,
} from "./action";

import { fetchFlats } from "../flats/action";

import {
  fetchFlatById,
  updateResidentFromFlat as removeResidentFromFlatAPI,
  addResident as addResidentAPI,
  updateResidentFromFlat,
} from "./api";
import { getResident } from "./helper";
import { selectResident } from "./selector";

function* fetchResidentWorker(action) {
  try {
    const result = yield call(fetchFlatById, action.payload);
    yield put(fetchFlatDetailsSuccess(result));
  } catch (error) {
    console.log("error:", error);
  }
}

function* removeResidentFromFlatWorker(action) {
  const { id, resident } = action.payload;
  try {
    yield call(removeResidentFromFlatAPI, { id, residents: resident });
    yield putResolve(fetchFlatDetails(id));
    yield put(removeResidentFromFlatSuccess());
  } catch (error) {
    console.log("error:", error);
  }
}

function* addResidentWorker(action) {
  const { id, body } = action.payload;
  try {
    const result = yield call(addResidentAPI, body);

    const { residentInFlat } = yield select(selectResident);
    const residents = getResident({ residentInFlat, newResident: result });

    yield call(updateResidentFromFlat, { id, residents });

    yield putResolve(fetchFlats());

    yield putResolve(addResidentSuccess());
  } catch (error) {
    console.log("error:", error);
  }
}

export function* residentSaga() {
  yield takeLatest(fetchFlatDetails().type, fetchResidentWorker);
  yield takeLatest(addResident().type, addResidentWorker);
  yield takeLatest(removeResidentFromFlat().type, removeResidentFromFlatWorker);
}
