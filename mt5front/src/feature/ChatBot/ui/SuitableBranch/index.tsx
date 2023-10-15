import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Branch } from "../../../../API/types";
import { COLORS } from "../../../../shared/constants";
import { getColorByTimeInLine } from "../../../map/api";

export interface SuitableBranchProps {
  branch: Branch;
  onPress: (id: Branch["id"]) => void;
}

export const SuitableBranch = ({ branch, onPress }: SuitableBranchProps) => {
  const distance = `${Math.round(branch.distance)} км от вас`;
  const wait = branch.time_in_line
    ? `Ожидание в очереди ${branch.time_in_line}`
    : "Нет информации о загруженности";

  return (
    <TouchableOpacity
      onPress={() => onPress(branch.id)}
      style={styles.container}
    >
      <Text style={styles.address} numberOfLines={1}>
        {branch.address}
      </Text>

      <View style={styles.distanceContainer}>
        <Image
          style={{ height: 14, width: 10 }}
          source={require("../../../../../assets/images/pin.png")}
        />
        <Text style={styles.distanceText}>{distance}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={[getColorByTimeInLine(branch?.time_in_line)]}>{wait}</Text>

        {!!branch.croud_tendency?.msg && (
          <Text>{branch.croud_tendency?.msg}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 12,
    justifyContent: "flex-start",
    backgroundColor: COLORS.backgroundLightBlue,
    borderRadius: 8,
    width: "100%",
    gap: 8,
  },
  address: {
    fontSize: 13,
    fontWeight: "600",
  },
  footer: {
    gap: 4,
  },
  distanceText: {
    fontSize: 11,
    fontWeight: "400",
  },
  distanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
