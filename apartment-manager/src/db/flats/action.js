import {
  FETCH_FLAT,
  FETCH_FLAT_BY_SORT,
  FETCH_FLAT_BY_SORT_SUCCESS,
  FETCH_FLAT_SUCCESS,
} from "./action-type";

export const fetchFlats = (payload) => ({
  type: FETCH_FLAT,
  payload,
});

export const fetchFlatSuccess = (payload) => ({
  type: FETCH_FLAT_SUCCESS,
  payload,
});

export const fetchFlatBySort = (payload) => ({
  type: FETCH_FLAT_BY_SORT,
  payload,
});

export const fetchFlatBySortSuccess = (payload) => ({
  type: FETCH_FLAT_BY_SORT_SUCCESS,
  payload,
});
