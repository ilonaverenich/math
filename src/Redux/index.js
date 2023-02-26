import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mainReducers from "./Reducers/mainReducers";

const rootReducer = combineReducers({
    data: mainReducers
})

export const store = configureStore({
    reducer: rootReducer
})