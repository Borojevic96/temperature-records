import { RootState } from "../store.ts";

export const getTemperatureRecords = (state: RootState) =>
  state.temperatureRecords?.data;

export const getLoading = (state: RootState) =>
  state.temperatureRecords.loading;

export const getFilters = (state: RootState) =>
  state.temperatureRecords.filters;
