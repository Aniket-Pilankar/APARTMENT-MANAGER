import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { loginReducer } from "./LoginSignUp/reducer";
import { flatReducer as flatReducerDummy } from "./2.FlatDetails/reducer";
import { residentReducer } from "./ResidentInSingleFlat/reducer";
import { allresidentReducer } from "./AllResidentList/reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";
import { appReducer } from "./App/reducer";
import { authReducer } from "../db/auth/reducer";
import { dbReducer } from "../db/reducer";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  login: loginReducer,
  flatInfo: flatReducerDummy,
  residentInfo: residentReducer,
  allresidentInfo: allresidentReducer,
  app: appReducer,
  auth: authReducer,
  db: dbReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = composeEnhancers(applyMiddleware(sagaMiddleware));

export const store = createStore(rootReducer, middleware);

sagaMiddleware.run(rootSaga);
