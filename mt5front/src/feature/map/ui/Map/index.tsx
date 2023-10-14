import dayjs from "dayjs";
import * as Location from "expo-location";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Animation, ClusteredYamap } from "react-native-yamap";
import { API } from "../../../../API";
import { Branch, Time } from "../../../../API/types";
import { COLORS } from "../../../../shared/constants";
import { ChatBot } from "../../../ChatBot";
import {
  getCurrentPosition,
  getCurrentWeekDay,
  prepareClustrers,
} from "../../api";
import { BranchData } from "../BranchData";
import { BranchMarker } from "../BranchMarker";
import { MapHeader } from "../MapHeader";

const api = new API();

export function Map() {
  const [zoom, setZoom] = useState(13);
  const mapRef = useRef<ClusteredYamap>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [offices, setOffices] = useState<Branch[]>([]);
  const [selectedOffice, setSelectedOffice] = useState<Branch | undefined>();
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const chatBotRef = useRef<Modalize>(null);

  const onMarkerPress = async ({ id }) => {
    if (isChatBotOpen) {
      setIsChatBotOpen(false);
    }
    const branch = await api.getBranch({
      id,
      current_time: dayjs().format("HH:MM") as Time,
      current_day: getCurrentWeekDay(),
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

  const handleCubePress = () => {
    if (selectedOffice) {
      setSelectedOffice(null);
    }
    setIsChatBotOpen((o) => !o);
  };

  useEffect(() => {
    if (isChatBotOpen) {
      chatBotRef.current?.open();
    } else {
      chatBotRef.current?.close();
    }
  }, [isChatBotOpen]);

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
      <MapHeader onCubePress={handleCubePress} />
      <View style={styles.controls}>
        <Pressable style={styles.control} onPress={zoomIn}>
          <Text style={{ fontSize: 20, fontWeight: "700" }}>+</Text>
        </Pressable>
        <Pressable style={styles.control} onPress={zoomOut}>
          <Text style={{ fontSize: 20, fontWeight: "700" }}>-</Text>
        </Pressable>
      </View>

      {selectedOffice && <BranchData branch={selectedOffice} />}

      {isChatBotOpen && <ChatBot />}
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
