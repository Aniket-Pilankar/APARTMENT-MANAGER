import { combineReducers } from "redux";
import { flatReducer } from "./flats/reducer";

export const dbReducer = combineReducers({
  flats: flatReducer,
});
