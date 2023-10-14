import * as Location from "expo-location";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ClusteredYamap, Marker } from "react-native-yamap";
import { API } from "../../API";
import { Office } from "../../API/types";
import { COLORS } from "../../shared/constants";
import { getCurrentPosition, prepareClustrers } from "./api";

const api = new API();

export function Map() {
  const [zoom, setZoom] = useState(13);
  const mapRef = useRef<ClusteredYamap>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [offices, setOffices] = useState<Office[]>([]);

  const onMarkerPress = () => {};

  const fetchBranches = useCallback(
    async ({ lat, lon }: { lat: number; lon: number }) => {
      const branches = await api.getBranches({
        lat,
        lon,
      });
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
    mapRef.current.setZoom(15);
    setLocation(currectLoc);
  }, []);

  const zoomIn = () => {
    setZoom((z) => Math.min(18, z + 1));
  };
  const zoomOut = () => {
    setZoom((z) => Math.max(5, z - 1));
  };

  useEffect(() => {
    mapRef.current.setZoom(zoom);
  }, [zoom]);

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
    <>
      <ClusteredYamap
        ref={mapRef}
        clusterColor={COLORS.mainBlue}
        showUserPosition
        clusteredMarkers={prepareClustrers(offices)}
        logoPadding={{
          horizontal: 10,
          vertical: 100,
        }}
        style={{ flex: 1 }}
        renderMarker={({ point, data }, i) => (
          <Marker
            source={require("../../../assets/images/office.png")}
            key={i}
            point={point}
            scale={3}
          />
        )}
      ></ClusteredYamap>
      <View style={styles.controls}>
        <Pressable style={styles.control} onPress={zoomIn}>
          <Text>in</Text>
        </Pressable>
        <Pressable style={styles.control} onPress={zoomOut}>
          <Text>out</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  controls: {
    position: "absolute",
    right: 20,
    top: "50%",

    padding: 10,
    gap: 10,
  },
  control: {
    backgroundColor: "blue",
    padding: 12,
    justifyContent: "center",
  },
});
