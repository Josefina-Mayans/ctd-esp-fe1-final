import { configureStore } from "@reduxjs/toolkit";
import personajesSlice from "./slice";

/**
 * The Redux store configuration.
 */
const store = configureStore({
    reducer: personajesSlice,
});

/**
 * The root state type of the Redux store.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * The type of the dispatch function in the Redux store.
 */
export type AppDispatch = typeof store.dispatch;

export default store;