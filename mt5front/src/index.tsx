import React from "react";
import { View } from "react-native";
import { Map } from "./feature/map/ui/Map";

export function Main() {
  return (
    <View style={{ flex: 1 }}>
      <Map />
    </View>
  );
}
