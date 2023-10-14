import * as Location from "expo-location";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import YaMap, { Marker } from "react-native-yamap";
import { API } from "../../API";
import { Office } from "../../API/types";
import { COLORS } from "../../shared/constants";
import { getCurrentPosition } from "./api";

const api = new API();

export function Map() {
  const mapRef = useRef<YaMap>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [offices, setOffices] = useState<Office[]>([]);

  const onMarkerPress = () => {};

  const fetchBranches = useCallback(
    async ({ lat, lon }: { lat: number; lon: number }) => {
      const branches = await api.getBranches({ lat, lon });
      setOffices(branches);
    },
    []
  );
  const initMap = useCallback(async () => {
    const currectLoc = await getCurrentPosition();
    const lat = currectLoc.coords.latitude;
    const lon = currectLoc.coords.longitude;

    mapRef.current.setCenter({
      lon,
      lat,
    });
    mapRef.current.setZoom(12);
    setLocation(currectLoc);
  }, []);

  useEffect(() => {
    if (location) {
      fetchBranches({
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      });
    }
  }, [location]);

  useEffect(() => {
    initMap();
  }, [initMap]);

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
