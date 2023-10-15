import { StyleSheet } from "react-native";
import { Marker, Point } from "react-native-yamap";
import { Branch } from "../../../../API/types";

export interface BranchMarkerProps {
  point: Point;
  data: Branch;
  onMarkerPress: ({ id }: { id: number }) => Promise<void>;
}

export const BranchMarker = (props: BranchMarkerProps) => {
  const { point, data, onMarkerPress } = props;

  return (
    <Marker
      source={require("../../../../../assets/images/office.png")}
      point={point}
      scale={0.3}
      onPress={() => {
        onMarkerPress({ id: data.id });
      }}
    />
  );
};

const styles = StyleSheet.create({
  img: {
    width: 30,
    height: 30,
  },
});
