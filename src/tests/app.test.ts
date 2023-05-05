import { describe, expect, test } from "vitest";
import {
  getAverageTemperature,
  getMostCommonTemperature,
} from "../utils/utils";
import mockedTemperatureData from "./mocks/temperatureData.mock.ts";

describe("App", () => {
  test("getAverageTemperature", () => {
    expect(getAverageTemperature(mockedTemperatureData)).not.toBeNull();
    expect(getAverageTemperature(mockedTemperatureData)).not.toBeNaN();
    expect(getAverageTemperature(mockedTemperatureData)).to.equal(2);
  });

  test("getMostCommonTemperature", () => {
    expect(getMostCommonTemperature(mockedTemperatureData)).not.toBeNull();
    expect(getMostCommonTemperature(mockedTemperatureData)).not.toBeNaN();
    expect(getMostCommonTemperature(mockedTemperatureData)).to.equal(3);
  });
});
