import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import YaMap, { Marker } from "react-native-yamap";
import { API } from "../../API";
import { Office } from "../../API/types";
import { COLORS } from "../../shared/constants";
import { getCurrentPosition } from "./api";

export function Map() {
  const mapRef = useRef<YaMap>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [offices, setOffices] = useState<Office[]>([]);

  const onMarkerPress = () => {};

  useEffect(() => {
    const api = new API();

    api.getOffices().then((o) => setOffices(o));
  }, []);

  useEffect(() => {
    (async () => {
      const location = await getCurrentPosition();
      mapRef.current.setCenter({
        lon: location.coords.longitude,
        lat: location.coords.latitude,
      });
      mapRef.current.setZoom(12);
      setLocation(location);
    })();
  }, []);

  return (
    <YaMap
      ref={mapRef}
      clusterColor={COLORS.mainBlue}
      showUserPosition
      logoPadding={{
        horizontal: 10,
        vertical: 100,
      }}
      style={{ flex: 1 }}
    >
      {offices.map((o, i) => (
        <Marker
          source={require("../../../assets/images/office.png")}
          key={i}
          point={{ lat: o.latitude, lon: o.longitude }}
          scale={2}
        />
      ))}
    </YaMap>
  );
}

const styles = StyleSheet.create({});
