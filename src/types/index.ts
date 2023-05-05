export default interface TemperatureRecordsTypes {
  location: string;
  time: number;
  temperature: number;
}

export interface TemperatureRecordsFormValues
  extends Omit<TemperatureRecordsTypes, "time"> {
  time: string;
}
