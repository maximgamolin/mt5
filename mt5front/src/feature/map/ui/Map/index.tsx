import BottomSheet from "@gorhom/bottom-sheet";
import * as Location from "expo-location";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Animation, ClusteredYamap, Point } from "react-native-yamap";
import { API } from "../../../../API";
import { Branch } from "../../../../API/types";
import { COLORS } from "../../../../shared/constants";
import { ChatBot } from "../../../ChatBot";
import {
  getCurrentPosition,
  getCurrentTime,
  getCurrentWeekDay,
  prepareClustrers,
} from "../../api";
import { INITIAL_ZOOM, MAX_ZOOM, MIN_ZOOM } from "../../utils/constanst";
import { BranchData } from "../BranchData";
import { BranchMarker } from "../BranchMarker";
import { MapHeader } from "../MapHeader";

const api = new API();

export function Map() {
  const [zoom, setZoom] = useState(INITIAL_ZOOM);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [offices, setOffices] = useState<Branch[]>([]);
  const [selectedOffice, setSelectedOffice] = useState<Branch | undefined>();
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  const chatBotRef = useRef<BottomSheet>(null);
  const branchDataRef = useRef<BottomSheet>(null);
  const mapRef = useRef<ClusteredYamap>(null);

  const onMarkerPress = async ({ id }) => {
    chatBotRef.current.close();

    const branch = await api.getBranch({
      id,
      current_time: getCurrentTime(),
      current_day: getCurrentWeekDay(),
    });
    setSelectedOffice(branch);
    branchDataRef.current.snapToIndex(0);
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
    setZoom((z) => Math.min(MAX_ZOOM, z + 1));
  };
  const zoomOut = () => {
    setZoom((z) => Math.max(MIN_ZOOM, z - 1));
  };

  const handleOpenChatBot = () => {
    branchDataRef.current.close();
    chatBotRef.current.snapToIndex(0);
  };

  const handleMapPress = () => {
    branchDataRef.current.close();
    chatBotRef.current.close();
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

  const moveCameraTo = (point: Point) => {
    mapRef.current.setCenter(
      { ...point, zoom: MAX_ZOOM },
      undefined,
      undefined,
      undefined,
      0.3,
      Animation.SMOOTH
    );
  };

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
        onMapPress={handleMapPress}
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
      <MapHeader onCubePress={handleOpenChatBot} />

      <Pressable onPress={handleOpenChatBot} style={styles.openBotBtn}>
        <Text>Подобрать точку</Text>
      </Pressable>

      <View style={styles.controls}>
        <Pressable style={styles.control} onPress={zoomIn}>
          <Text style={{ fontSize: 20, fontWeight: "700" }}>+</Text>
        </Pressable>
        <Pressable style={styles.control} onPress={zoomOut}>
          <Text style={{ fontSize: 20, fontWeight: "700" }}>-</Text>
        </Pressable>
      </View>

      <BottomSheet ref={branchDataRef} snapPoints={[170, 600]}>
        {selectedOffice && (
          <BranchData branch={selectedOffice} showOnMap={moveCameraTo} />
        )}
      </BottomSheet>

      <BottomSheet ref={chatBotRef} snapPoints={["85%"]}>
        <ChatBot openBranchData={onMarkerPress} />
      </BottomSheet>
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

  openBotBtn: {
    backgroundColor: COLORS.white,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 8,
    position: "absolute",
    top: "15%",
    alignSelf: "center",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
});
