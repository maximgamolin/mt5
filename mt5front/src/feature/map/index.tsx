import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { ClusteredYamap, Marker } from "react-native-yamap";
import { API } from "../../API";
import { Office } from "../../API/types";
import { COLORS } from "../../shared/constants";

export function Map() {
  const mapRef = useRef<ClusteredYamap>(null);
  const [offices, setOffices] = useState<Office[]>([]);

  useEffect(() => {
    const api = new API();

    api.getOffices().then((o) => setOffices(o));
  }, []);

  const renderMarker = (
    {
      data: o,
    }: {
      point: { lat: number; lon: number };
      data: Office;
    },
    i: number
  ) => {
    return (
      <Marker
        source={require("../../../assets/images/office.png")}
        key={i}
        point={{ lat: o.latitude, lon: o.longitude }}
        scale={2}
      />
    );
  };
  return (
    <ClusteredYamap
      ref={mapRef}
      clusterColor={COLORS.mainBlue}
      showUserPosition
      logoPadding={{
        horizontal: 10,
        vertical: 100,
      }}
      style={{ flex: 1 }}
      clusteredMarkers={offices.map((o) => ({
        point: { lat: o.latitude, lon: o.longitude },
        data: o,
      }))}
      // @ts-expect-error incorrect type
      renderMarker={renderMarker}
    ></ClusteredYamap>
  );
}

const styles = StyleSheet.create({});
