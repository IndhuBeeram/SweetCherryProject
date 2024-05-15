import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./slice/getUserslice";

const store=configureStore({
    reducer:{
        api:apiSlice
    }
})
export default store;