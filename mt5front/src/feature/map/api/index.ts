import * as Location from "expo-location";
import { Branch, Day } from "../../../API/types";

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

export const getCurrentWeekDay = (day: number) => {
  return Day[day];
};
