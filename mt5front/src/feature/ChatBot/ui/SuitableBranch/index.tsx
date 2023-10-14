import { Pressable, StyleSheet, Text, View } from "react-native";
import { Branch } from "../../../../API/types";
import { COLORS } from "../../../../shared/constants";
import { getColorByTimeInLine } from "../../../map/api";

export interface SuitableBranchProps {
  branch: Branch;
  onPress: (id: Branch["id"]) => void;
}

export const SuitableBranch = ({ branch, onPress }: SuitableBranchProps) => {
  console.log(branch);
  const distance = `${Math.round(branch.distance)} км от вас`;
  const wait = `Ожидание в очереди ${branch.time_in_line}`;

  return (
    <Pressable onPress={() => onPress(branch.id)} style={styles.container}>
      <Text style={styles.address} numberOfLines={1}>
        {branch.address}
      </Text>

      <Text>{distance}</Text>

      <View style={styles.footer}>
        {!!branch.time_in_line && (
          <Text style={[getColorByTimeInLine(branch?.time_in_line)]}>
            {wait}
          </Text>
        )}
        {!!branch.croud_tendency?.msg && (
          <Text>{branch.croud_tendency?.msg}</Text>
        )}
      </View>
    </Pressable>
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
});
