import { configureStore } from "@reduxjs/toolkit";
import temperatureRecordsReducer from "./reducer/app.ts";

export const store = configureStore({
  reducer: {
    [temperatureRecordsReducer.name]: temperatureRecordsReducer.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
