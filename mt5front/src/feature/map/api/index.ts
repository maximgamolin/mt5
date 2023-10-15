import dayjs from "dayjs";
import * as Location from "expo-location";
import { Branch, Day, Time, TimeInLine } from "../../../API/types";
import { COLORS } from "../../../shared/constants";

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
  return Day.Tuesday;
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

export const getCurrentTime = (): Time => {
  return "10:00";
  return dayjs().format("HH:MM") as Time;
};

export const getColorByTimeInLine = (time: TimeInLine): { color: string } => {
  return {
    "15 - 20 минут": {
      color: COLORS.orange,
    },
    "5 - 7 минут": {
      color: COLORS.green,
    },
    "от 30 минут": {
      color: COLORS.red,
    },
  }[time];
};
