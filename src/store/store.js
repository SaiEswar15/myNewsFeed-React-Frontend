import {configureStore} from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import authSlice from "./authSlice";

let store = configureStore({
    reducer :
    {
        api : apiSlice.reducer,
        auth : authSlice.reducer
    }
})

export default store;
