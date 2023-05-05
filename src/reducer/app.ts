import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import TemperatureRecordsTypes from "../types";

interface FilterTypes {
  startDate: number;
  endDate: number;
}
interface TemperatureRecordsArray {
  data: TemperatureRecordsTypes[];
  loading: boolean;
  filters: FilterTypes;
}

const initialState: TemperatureRecordsArray = {
  data: [],
  loading: false,
  filters: { startDate: 0, endDate: 0 },
};

export const temperatureRecordsState = createSlice({
  name: "temperatureRecords",
  initialState,
  reducers: {
    storeData: (state, action: PayloadAction<TemperatureRecordsTypes[]>) => {
      action.payload.forEach((item) => {
        state.data.push(item);
      });
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterTypes>) => {
      state.filters = action.payload;
    },
  },
});

export const { storeData, setLoading, setFilters } =
  temperatureRecordsState.actions;

export default temperatureRecordsState;
