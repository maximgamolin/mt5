import { StyleSheet } from "react-native";
import { Marker, Point } from "react-native-yamap";
import { Office } from "../../../../API/types";

export interface BranchMarkerProps {
  point: Point;
  data: Office;
}

export const BranchMarker = (props: BranchMarkerProps) => {
  const { point, data } = props;

  return (
    <Marker
      source={require("../../../../../assets/images/office.png")}
      point={point}
      scale={3}
    />
  );
};

const styles = StyleSheet.create({
  img: {
    width: 30,
    height: 30,
  },
});
