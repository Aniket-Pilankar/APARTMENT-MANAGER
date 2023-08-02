import {
  ADD_RESIDENT,
  ADD_RESIDENT_SUCCESS,
  FETCH_RESIDENT,
  FETCH_RESIDENT_SUCCESS,
  REMOVE_RESIDENT_FROM_FLAT,
  REMOVE_RESIDENT_FROM_FLAT_SUCCESS,
} from "./action-type";

export const fetchFlatDetails = (payload) => ({
  type: FETCH_RESIDENT,
  payload,
});

export const fetchFlatDetailsSuccess = (payload) => ({
  type: FETCH_RESIDENT_SUCCESS,
  payload,
});

export const removeResidentFromFlat = (payload) => ({
  type: REMOVE_RESIDENT_FROM_FLAT,
  payload,
});

export const removeResidentFromFlatSuccess = (payload) => ({
  type: REMOVE_RESIDENT_FROM_FLAT_SUCCESS,
  payload,
});

export const addResident = (payload) => ({
  type: ADD_RESIDENT,
  payload,
});

export const addResidentSuccess = (payload) => ({
  type: ADD_RESIDENT_SUCCESS,
  payload,
});
