import { FETCH_FLAT_BY_SORT_SUCCESS, FETCH_FLAT_SUCCESS } from "./action-type";
import { createFlatsFactory } from "./helper";

const intialState = {
  currentFlat: "",
  order: [],
  byId: {},
  total: 0,
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
      };

      newState.total = totalPage;

      for (const data of flats) {
        const flat = createFlatsFactory(data);
        newState.byId[flat.id] = flat;
        newState.order.push(flat.id);
      }

      return newState;
    }

    default:
      return state;
  }
};
