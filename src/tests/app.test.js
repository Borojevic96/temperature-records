import { describe, expect, test } from "vitest";
import { getAverageTemperature } from "../utils/utils";

describe("App", () => {
  test("getAverageTemperature", () => {
    const data = [
      { location: "Ljubljana", temperature: 1, time: 1572127200000 },
      { location: "Ljubljana", temperature: 2, time: 1572127200000 },
      { location: "Ljubljana", temperature: 3, time: 1572127200000 },
    ];

    expect(getAverageTemperature(data)).to.equal(2);
  });
});
