import { StyleSheet, Text, View } from "react-native";
import { Branch } from "../../../../API/types";
import { COLORS } from "../../../../shared/constants";

export interface SuitableBranchProps {
  branch: Branch;
}

export const SuitableBranch = ({ branch }: SuitableBranchProps) => {
  console.log(branch);
  return (
    <View style={styles.container}>
      <Text style={styles.address} numberOfLines={1}>
        {branch.address}
      </Text>
      <View>
        <Text>{branch?.distance}</Text>
      </View>
      <Text>{branch?.time_in_line}</Text>
      <Text>{branch.croud_tendency?.msg}</Text>
    </View>
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
  },
  address: {
    fontSize: 13,
    fontWeight: "600",
  },
});
