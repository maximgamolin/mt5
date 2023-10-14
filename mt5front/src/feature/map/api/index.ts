import * as Location from "expo-location";

export const getCurrentPosition = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return;
  }

  let location = await Location.getCurrentPositionAsync({});

  return location;
};
