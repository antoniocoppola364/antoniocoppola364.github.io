import {combineReducers} from "redux";
import {scenarioReducer} from "./reducers";
import {configureStore} from "@reduxjs/toolkit";
import {initExplorerState} from "./state";


const rootReducer = combineReducers({
    scenario: scenarioReducer,
});

const store = configureStore({reducer: rootReducer, preloadedState: initExplorerState});

export default store;
