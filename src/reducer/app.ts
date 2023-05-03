import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import TemperatureRecordsTypes from "../types";

interface FilterTypes {
  startDate: number;
  endDate: number;
}
interface temperatureRecordsArray {
  data: TemperatureRecordsTypes[];
  loading: boolean;
  filters: FilterTypes;
}

const initialState: temperatureRecordsArray = {
  data: [],
  loading: false,
  filters: { startDate: 0, endDate: 0 },
};

export const temperatureRecordsState = createSlice({
  name: "temperatureRecords",
  initialState,
  reducers: {
    storeData: (state, action: PayloadAction<TemperatureRecordsTypes[]>) => {
      return {
        ...state,
        data: [...(state?.data || []), ...action.payload],
      };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setFilters: (state, action: PayloadAction<FilterTypes>) => {
      return {
        ...state,
        filters: action.payload,
      };
    },
  },
});

export const { storeData, setLoading, setFilters } =
  temperatureRecordsState.actions;

export default temperatureRecordsState.reducer;
