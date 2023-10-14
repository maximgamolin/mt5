import React from "react";
import { View } from "react-native";
import { Map } from "./feature/map";

export function Main() {
  return (
    <View style={{ flex: 1 }}>
      <Map />
    </View>
  );
}
