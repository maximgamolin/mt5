import * as Location from "expo-location";
import { Branch, Day } from "../../../API/types";
import dayjs from "dayjs";

export const getCurrentPosition = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return;
  }

  let location = await Location.getCurrentPositionAsync({});

  return location;
};

export const prepareClustrers = (branches: Branch[]) => {
  return branches.map((i) => {
    return {
      point: {
        lat: i.latitude,
        lon: i.longitude,
      },
      data: i,
    };
  });
};

export const getCurrentWeekDay = () => {
  return [
    Day.Monday,
    Day.Tuesday,
    Day.Wednesday,
    Day.Thursday,
    Day.Friday,
    Day.Saturday,
    Day.Sunday,
  ][dayjs().day()];
};
