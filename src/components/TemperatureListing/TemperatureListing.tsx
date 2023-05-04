import React from "react";
import { TextField } from "@material-ui/core";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import moment from "moment/moment";
import { formatCelsiusTemperature } from "../../utils/utils.ts";
import TemperatureRecordsTypes from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../reducer/app.ts";
import style from "./TemperatureListing.module.scss";
import { getFilters, getLoading } from "../../selectors/app.selectors.ts";
const TemperatureListing: React.FC<{ data?: TemperatureRecordsTypes[] }> = ({
  data,
}) => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const filters = useSelector(getFilters);

  const columns: GridColDef[] = [
    { field: "location", headerName: "Location", sortable: false, flex: 1 },
    { field: "time", headerName: "Time", sortable: false, flex: 1 },
    {
      field: "temperature",
      headerName: "Temperature",
      sortable: false,
      flex: 1,
    },
  ];

  const rows = useMemo(
    () =>
      data?.length
        ? [...(data as TemperatureRecordsTypes[])]
            .sort(
              (a: TemperatureRecordsTypes, b: TemperatureRecordsTypes) =>
                Number(b.time) - Number(a.time)
            )
            .map(
              (
                { location, time, temperature }: TemperatureRecordsTypes,
                index
              ) => ({
                id: `${time}${index}`,
                location,
                time: moment(time).format("DD/MM/YYYY, HH:mm"),
                temperature: formatCelsiusTemperature(temperature),
              })
            )
        : [],
    [data]
  );

  return (
    <>
      <div className={style["temperature-listing"]}>
        <h4 className={style["temperature-listing__label"]}>Filter by date:</h4>
        <TextField
          id="time"
          label="Choose start date"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          className={style["temperature-listing__start-date"]}
          onChange={(input) => {
            dispatch(
              setFilters({
                startDate: +new Date(input.target.value),
                endDate: filters?.endDate,
              })
            );
          }}
        />
        <TextField
          id="time"
          label="Choose end date"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          onChange={(input) => {
            dispatch(
              setFilters({
                startDate: filters?.startDate,
                endDate: +new Date(input.target.value),
              })
            );
          }}
        />
      </div>
      {data?.length ? (
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          disableColumnMenu
          density={"compact"}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
        />
      ) : (
        <h3 className={style["temperature-listing"]}>
          No data for selected period!
        </h3>
      )}
    </>
  );
};

export default React.memo(TemperatureListing);
