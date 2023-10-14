import * as Location from "expo-location";
import { Office } from "../../../API/types";

export const getCurrentPosition = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return;
  }

  let location = await Location.getCurrentPositionAsync({});

  return location;
};

export const prepareClustrers = (branches: Office[]) => {
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
