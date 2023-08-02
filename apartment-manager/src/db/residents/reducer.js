import { FETCH_RESIDENT_SUCCESS } from "./action-type";
import { createResidentFactory } from "./helper";

const intialState = {
  flatId: "",
  byId: {},
  total: 0,
};

export const residentReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case FETCH_RESIDENT_SUCCESS: {
      const { resident_id: residents } = payload;

      const newState = {
        ...state,
        byId: {},
        total: 0,
      };

      for (const resident of residents) {
        const residentsInFlats = createResidentFactory({ resident });
        newState.byId[residentsInFlats.id] = residentsInFlats;
        newState.total++;
      }

      return newState;
    }
    default:
      return state;
  }
};
