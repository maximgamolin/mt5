import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../../shared/constants";

export interface MapHeaderProps {
  onCubePress: () => void;
}
export const MapHeader = ({ onCubePress }: MapHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerItem} />
      <Text style={styles.title}>Отделения и Банкоматы</Text>
      <TouchableOpacity style={styles.cubeContainer} onPress={onCubePress}>
        <Image
          style={styles.cube}
          source={require("../../../../../assets/images/cube.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    flexDirection: "row",
    paddingTop: 40,
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  headerItem: {
    backgroundColor: "red",
  },
  title: {
    flexBasis: "66%",
    textAlign: "center",
    fontSize: 18,
  },
  cubeContainer: {
    height: 50,
    aspectRatio: 1 / 1,
  },
  cube: {
    height: 50,
    aspectRatio: 1 / 1,
  },
});
