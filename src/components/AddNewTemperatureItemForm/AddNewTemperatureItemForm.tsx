import { Formik } from "formik";
import { Button, TextField } from "@material-ui/core";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete } from "@mui/material";
import TemperatureRecordsTypes, {
  TemperatureRecordsFormValues,
} from "../../types";
import { setLoading, storeData } from "../../reducer/app.ts";
import style from "./AddNewTemperatureItemForm.module.scss";
import { RootState } from "../../store.ts";

const AddNewTemperatureItemForm = () => {
  const dispatch = useDispatch();
  const dataFromRedux = useSelector(
    (state: RootState) => state.temperatureRecords?.data
  );

  const initialValues: TemperatureRecordsFormValues = {
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
  }: TemperatureRecordsFormValues) => {
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
                (obj: string, index: number, self: string[]) =>
                  self.findIndex((o: string) => o === obj) === index
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
