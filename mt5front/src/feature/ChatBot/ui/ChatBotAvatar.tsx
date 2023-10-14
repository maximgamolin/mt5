import { Image, StyleSheet, View } from "react-native";
import { COLORS } from "../../../shared/constants";

export const ChatBotAvatar = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../../assets/images/cube.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    height: 40,
    aspectRatio: 1 / 1,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 35,
    aspectRatio: 1 / 1,
  },
});
