import { SET_ERROR } from "./action";

const initialState = {
  error: "",
};

export const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ERROR:
      return { ...state, error: payload };
    default:
      return state;
  }
};
