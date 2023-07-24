import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { loginReducer } from "./LoginSignUp/reducer";
import { flatReducer } from "./2.FlatDetails/reducer";
import { residentReducer } from "./ResidentInSingleFlat/reducer";
import { allresidentReducer } from "./AllResidentList/reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";
import { appReducer } from "./App/reducer";
import { authReducer } from "./auth/reducer";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  login: loginReducer,
  flatInfo: flatReducer,
  residentInfo: residentReducer,
  allresidentInfo: allresidentReducer,
  app: appReducer,
  auth: authReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = composeEnhancers(applyMiddleware(sagaMiddleware));

export const store = createStore(rootReducer, middleware);

sagaMiddleware.run(rootSaga);
