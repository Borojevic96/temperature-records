import { Formik } from "formik";
import { Button, TextField } from "@material-ui/core";
import moment from "moment/moment";
import TemperatureRecordsTypes from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, storeData } from "../../reducer/app.ts";
import { Autocomplete } from "@mui/material";
import style from "./AddNewTemperatureItemForm.module.scss";

const AddNewTemperatureItemForm = () => {
  const dispatch = useDispatch();
  const dataFromRedux = useSelector(
    (state: any) => state.temperatureRecords?.data
  );
  const initialValues: TemperatureRecordsTypes = {
    location: "",
    time: moment().format("YYYY-MM-DDTHH:mm"),
    temperature: 0,
  };

  const delay = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };
  const networkDelay = (maxTime: number) => delay(Math.random() * maxTime);
  const setLoadingFunction = (value: boolean) => {
    dispatch(setLoading(value));
  };

  const onSubmit = async ({
    location,
    time,
    temperature,
  }: TemperatureRecordsTypes) => {
    setLoadingFunction(true);
    await networkDelay(2000).then(() => setLoadingFunction(false));

    dispatch(
      storeData([
        {
          location,
          time: +new Date(time),
          temperature: temperature + 273.15,
        },
      ])
    );
  };

  const allLocations = dataFromRedux?.map(
    ({ location }: TemperatureRecordsTypes) => location
  );

  return (
    <div className={style["add-new-temperature-form"]}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
        }) => (
          <form onSubmit={handleSubmit}>
            <Autocomplete
              id="location"
              sx={{ width: 200 }}
              renderInput={(params) => (
                <TextField {...params} label="Location" required />
              )}
              options={allLocations.filter(
                (obj: any, index: number, self: any) =>
                  self.findIndex((o: any) => o === obj) === index
              )}
              onSelect={handleChange}
            />
            <TextField
              id="time"
              label="Choose time"
              type="datetime-local"
              onChange={handleChange}
              value={values.time}
            />
            <TextField
              type="number"
              id="temperature"
              name="temperature"
              label="Temperature"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.temperature}
            />
            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              color="primary"
              variant="contained"
            >
              Add new
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddNewTemperatureItemForm;
