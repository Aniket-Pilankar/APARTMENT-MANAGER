import { combineReducers, createStore } from "redux";
import { loginReducer } from "./LoginSignUp/reducer";
import { flatReducer } from "./2.FlatDetails/reducer";
import {residentReducer} from './ResidentInSingleFlat/reducer'
import { allresidentReducer } from "./AllResidentList/reducer";

const rootReducer = combineReducers({
    login: loginReducer,
    flatInfo:flatReducer,
    residentInfo:residentReducer,
    allresidentInfo:allresidentReducer
})

export const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)