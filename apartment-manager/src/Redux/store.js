import { combineReducers, createStore } from "redux";
import { loginReducer } from "./LoginSignUp/reducer";

const rootReducer = combineReducers({
    login: loginReducer
})

export const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)