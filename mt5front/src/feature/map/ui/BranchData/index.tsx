import { StyleSheet, Text, View } from "react-native";
import { Office } from "../../../../API/types";

export interface BranchDataProps {
  branch: Office;
}

export const BranchData = ({ branch }: BranchDataProps) => {
  console.log(branch.croud_tendency);
  return (
    <View style={styles.selectedOfficeContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 24 }}>ВТБ Банк</Text>
        <Text>Время в очереди: {branch.time_in_line}</Text>
      </View>
      <Text>{branch.croud_tendency?.msg}</Text>
      <Text>{branch.address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  selectedOfficeContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    paddingTop: 16,
    paddingHorizontal: 16,
    height: "50%",
  },
});
