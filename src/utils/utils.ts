import TemperatureRecordsTypes from "../types";

enum temperatureConstants {
  KELVIN_CONSTANT = 273.15,
}
const convertKelvinToCelsiusTemperature = (value: number): number => {
  return value - temperatureConstants.KELVIN_CONSTANT;
};
const formatCelsiusTemperature = (value: number): string => {
  return `${convertKelvinToCelsiusTemperature(value).toFixed(1)} °C`;
};

const getAverageTemperature = (data: TemperatureRecordsTypes[]): number => {
  const sum = data?.reduce(
    (acc: number, curr: TemperatureRecordsTypes) => acc + curr.temperature,
    0
  );
  return sum / data?.length;
};

const getHotDays = (
  data: TemperatureRecordsTypes[],
  hotThreshold: number
): number => {
  return data.filter(
    ({ temperature }: TemperatureRecordsTypes) =>
      convertKelvinToCelsiusTemperature(temperature) >= hotThreshold
  ).length;
};
const getColdDays = (
  data: TemperatureRecordsTypes[],
  hotThreshold: number
): number => {
  return data?.filter(
    ({ temperature }: TemperatureRecordsTypes) =>
      convertKelvinToCelsiusTemperature(temperature) < hotThreshold
  ).length;
};

const getNumberOfDaysAboveAverage = (
  data: TemperatureRecordsTypes[],
  averageTemperature: number
): number => {
  return data.filter(
    ({ temperature }: TemperatureRecordsTypes) =>
      convertKelvinToCelsiusTemperature(temperature) >
      convertKelvinToCelsiusTemperature(averageTemperature)
  ).length;
};

const getMostCommonTemperature = (data: TemperatureRecordsTypes[]): number => {
  const freqTemperatureMap: Record<string, number> = {};

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
