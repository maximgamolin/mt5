import * as Location from "expo-location";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Animation, ClusteredYamap } from "react-native-yamap";
import { API } from "../../API";
import { Day, Office } from "../../API/types";
import { COLORS } from "../../shared/constants";
import { getCurrentPosition, prepareClustrers } from "./api";
import { BranchData } from "./ui/BranchData";
import { BranchMarker } from "./ui/BranchMarker";

const api = new API();

export function Map() {
  const [zoom, setZoom] = useState(13);
  const mapRef = useRef<ClusteredYamap>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [offices, setOffices] = useState<Office[]>([]);
  const [selectedOffice, setSelectedOffice] = useState<Office | undefined>();

  const onMarkerPress = async ({ id }) => {
    const branch = await api.getBranch({
      id,
      current_time: "10:00",
      current_day: Day.Monday,
    });
    setSelectedOffice(branch);
  };

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
    mapRef.current.setZoom(zoom);
    setLocation(currectLoc);
  }, []);

  const zoomIn = () => {
    setZoom((z) => Math.min(18, z + 1));
  };
  const zoomOut = () => {
    setZoom((z) => Math.max(5, z - 1));
  };

  useEffect(() => {
    mapRef.current.setZoom(zoom, 0.3, Animation.SMOOTH);
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
        onMapPress={() => setSelectedOffice(undefined)}
        renderMarker={({ point, data }, i) => (
          <BranchMarker
            key={i}
            point={point}
            //@ts-expect-error type mistake
            data={data}
            onMarkerPress={onMarkerPress}
          />
        )}
      ></ClusteredYamap>
      <View style={styles.controls}>
        <Pressable style={styles.control} onPress={zoomIn}>
          <Text style={{ fontSize: 20, fontWeight: "700" }}>+</Text>
        </Pressable>
        <Pressable style={styles.control} onPress={zoomOut}>
          <Text style={{ fontSize: 20, fontWeight: "700" }}>-</Text>
        </Pressable>
      </View>

      {selectedOffice && <BranchData branch={selectedOffice} />}
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
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,

    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
});
