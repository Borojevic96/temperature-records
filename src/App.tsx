import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddNewTemperatureItemForm from "./components/AddNewTemperatureItemForm";
import { storeData } from "./reducer/app.ts";
import "./app.scss";
import Statistics from "./components/Statistics";
import TemperatureListing from "./components/TemperatureListing";
import { temperatureRecords } from "./data/temperatureData.ts";
import TemperatureRecordsTypes from "./types";
import {
  getFilters,
  getTemperatureRecords,
} from "./selectors/app.selectors.ts";

const App = () => {
  const dispatch = useDispatch();
  const filters = useSelector(getFilters);
  const dataFromRedux = useSelector(getTemperatureRecords);

  const data = useMemo(() => {
    if (dataFromRedux?.length) {
      if (!!filters.startDate && !!filters?.endDate) {
        return dataFromRedux.filter(
          (item: TemperatureRecordsTypes) =>
            filters.startDate <= item.time && item.time <= filters.endDate
        );
      }
      return dataFromRedux;
    }

    return [];
  }, [dataFromRedux, filters]);

  useEffect(() => {
    dispatch(storeData(temperatureRecords));
  }, []);

  return (
    <>
      <AddNewTemperatureItemForm />
      <TemperatureListing data={data} />
      <Statistics data={data} />
    </>
  );
};

export default App;
