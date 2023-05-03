import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddNewTemperatureItemForm from "./components/AddNewTemperatureItemForm";
import { storeData } from "./reducer/app.ts";
import "./app.scss";
import Statistics from "./components/Statistics";
import TemperatureListing from "./components/TemperatureListing";
import { temperatureRecords } from "./data/temperatureData.ts";

const App = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: any) => state.temperatureRecords.filters);
  const dataFromRedux = useSelector(
    (state: any) => state.temperatureRecords?.data
  );

  const data = useMemo(() => {
    if (dataFromRedux?.length) {
      if (!!filters.startDate && !!filters?.endDate) {
        return dataFromRedux.filter(
          (item: any) =>
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
