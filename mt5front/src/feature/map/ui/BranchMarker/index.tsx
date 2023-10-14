import { StyleSheet } from "react-native";
import { Marker, Point } from "react-native-yamap";
import { Office } from "../../../../API/types";

export interface BranchMarkerProps {
  point: Point;
  data: Office;
  onMarkerPress: ({ id }: { id: number }) => Promise<void>;
}

export const BranchMarker = (props: BranchMarkerProps) => {
  const { point, data, onMarkerPress } = props;

  return (
    <Marker
      source={require("../../../../../assets/images/office.png")}
      point={point}
      scale={3}
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
