import React from "react";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import TemperatureRecordsTypes from "../../types";
import {
  formatCelsiusTemperature,
  getAverageTemperature,
  getColdDays,
  getHotDays,
  getMostCommonTemperature,
  getNumberOfDaysAboveAverage,
} from "../../utils/utils.ts";
import { getLoading } from "../../selectors/app.selectors.ts";
import style from "./Statistics.module.scss";

const Statistics: React.FC<{ data: TemperatureRecordsTypes[] }> = ({
  data,
}) => {
  const hotThreshold = 25;
  const mostCommonTemperature = getMostCommonTemperature(data);
  const averageTemperature = getAverageTemperature(data);
  const hotDays = getHotDays(data, hotThreshold);
  const coldDays = getColdDays(data, hotThreshold);
  const numberOfDaysAboveAverage = getNumberOfDaysAboveAverage(
    data,
    averageTemperature
  );
  const loading = useSelector(getLoading);

  const statisticsList = [
    {
      label: "Average temperature: ",
      value: formatCelsiusTemperature(averageTemperature),
    },
    {
      label: "Number of days above average:",
      value: numberOfDaysAboveAverage,
    },
    {
      label: "Number of cold days:",
      value: coldDays,
    },
    {
      label: "Number of hot days:",
      value: hotDays,
    },
    {
      label: "Most common temperature:",
      value: formatCelsiusTemperature(mostCommonTemperature),
    },
  ];

  if (!data?.length) {
    return null;
  }

  return (
    <div
      className={`${style.statistics} ${
        loading ? style.statistics__loading : ""
      }`}
    >
      {loading && <CircularProgress />}
      {statisticsList.map(({ label, value }) => (
        <p key={label} className={style.statistics__item}>
          <span className={style["statistics__item-label"]}>{label}</span>
          {value}
        </p>
      ))}
    </div>
  );
};

export default React.memo(Statistics);
