import { configureStore } from "@reduxjs/toolkit";
import stateReduce  from "./States/stateSlice"


export const store = configureStore({
    reducer:{
        myState:stateReduce,
    }
})


export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']