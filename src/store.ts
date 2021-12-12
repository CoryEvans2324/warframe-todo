import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./reducers/itemReducer";

const store = configureStore({
  reducer: {
    currentItem: itemReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;