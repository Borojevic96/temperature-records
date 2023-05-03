import TemperatureRecordsTypes from "../types";

const convertKelvinToCelsiusTemperature = (value: number) => value - 273.15;
const formatCelsiusTemperature = (value: number) => {
  return `${convertKelvinToCelsiusTemperature(value).toFixed(1)} °C`;
};

const getAverageTemperature = (data: TemperatureRecordsTypes[]) => {
  const sum = data?.reduce(
    (acc: number, curr: TemperatureRecordsTypes) => acc + curr.temperature,
    0
  );
  return sum / data?.length;
};

const getHotDays = (data: TemperatureRecordsTypes[], hotThreshold: number) => {
  return data.filter(
    ({ temperature }: TemperatureRecordsTypes) =>
      convertKelvinToCelsiusTemperature(temperature) >= hotThreshold
  ).length;
};
const getColdDays = (data: TemperatureRecordsTypes[], hotThreshold: number) => {
  return data?.filter(
    ({ temperature }: TemperatureRecordsTypes) =>
      convertKelvinToCelsiusTemperature(temperature) < hotThreshold
  ).length;
};

const getNumberOfDaysAboveAverage = (
  data: TemperatureRecordsTypes[],
  averageTemperature: number
) => {
  return data.filter(
    ({ temperature }: TemperatureRecordsTypes) =>
      convertKelvinToCelsiusTemperature(temperature) >
      convertKelvinToCelsiusTemperature(averageTemperature)
  ).length;
};

const getMostCommonTemperature = (data: TemperatureRecordsTypes[]) => {
  const freqTemperatureMap: any = {};

  data.forEach(({ temperature }: TemperatureRecordsTypes) => {
    freqTemperatureMap[temperature] =
      (freqTemperatureMap[temperature] || 0) + 1;
  });

  return Object.keys(freqTemperatureMap).reduce((acc, curr) => {
    const currentTemperature = Number(curr);
    return freqTemperatureMap[acc] > freqTemperatureMap[currentTemperature]
      ? acc
      : currentTemperature;
  }, 0);
};

export {
  getAverageTemperature,
  convertKelvinToCelsiusTemperature,
  formatCelsiusTemperature,
  getHotDays,
  getColdDays,
  getNumberOfDaysAboveAverage,
  getMostCommonTemperature,
};
