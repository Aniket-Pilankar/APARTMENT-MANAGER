import { FETCH_RESIDENT_SUCCESS } from "../residents/action-type";
import { FETCH_FLAT_BY_SORT_SUCCESS, FETCH_FLAT_SUCCESS } from "./action-type";
import { createFlatsFactory } from "./helper";

const intialState = {
  currentFlat: "",
  order: [],
  byId: {},
  total: 0,
  residentIds: [],
};

export const flatReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case FETCH_FLAT_SUCCESS:
    case FETCH_FLAT_BY_SORT_SUCCESS: {
      const { totalPage, flat: flats } = payload;

      const newState = {
        ...state,
        currentFlat: "",
        byId: {},
        total: 0,
        order: [],
        residentIds: [],
      };

      newState.total = totalPage;

      for (const data of flats) {
        const flat = createFlatsFactory(data);
        newState.byId[flat.id] = flat;
        newState.order.push(flat.id);
      }

      return newState;
    }

    case FETCH_RESIDENT_SUCCESS: {
      const { resident_id: residents } = payload;

      const newState = {
        ...state,
        residentIds: [],
      };

      for (const resident of residents) {
        newState.residentIds.push(resident._id);
      }

      return newState;
    }

    default:
      return state;
  }
};
