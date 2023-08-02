import { combineReducers } from "redux";
import { flatReducer } from "./flats/reducer";
import { residentReducer } from "./residents/reducer";

export const dbReducer = combineReducers({
  flats: flatReducer,
  resident: residentReducer,
});
