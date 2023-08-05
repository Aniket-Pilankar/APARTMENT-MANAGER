import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { allresidentReducer } from "./AllResidentList/reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";
import { appReducer } from "./App/reducer";
import { authReducer } from "../db/auth/reducer";
import { dbReducer } from "../db/reducer";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  allresidentInfo: allresidentReducer,
  app: appReducer,
  auth: authReducer,
  db: dbReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = composeEnhancers(applyMiddleware(sagaMiddleware));

export const store = createStore(rootReducer, middleware);

sagaMiddleware.run(rootSaga);
