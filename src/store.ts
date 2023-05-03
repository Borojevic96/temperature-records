import { configureStore } from "@reduxjs/toolkit";
import temperatureRecordsReducer from "./reducer/app.ts";
export const store = configureStore({
  reducer: {
    temperatureRecords: temperatureRecordsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
