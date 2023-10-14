import { StyleSheet, Text, View } from "react-native";
import { BranchLoad } from "../../../../API/types";
import { COLORS } from "../../../../shared/constants";

export interface BranchBusyProps {
  load: BranchLoad[];
}

const WORKING_HOURS = ["9:00", "12:00", "15:00", "18:00", "21:00"];
const getLoadColor = (load: number) => {
  if (load < 30) return COLORS.green;
  if (load < 60) return COLORS.orange;
  return COLORS.red;
};

export const BranchBusy = ({ load }: BranchBusyProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Воскресенье</Text>
        <Text>15 Окт 2023</Text>
      </View>
      <View style={styles.loadContainer}>
        {load.map((l) => {
          return (
            <View
              style={[
                styles.loadItem,
                {
                  height: l.load / 2,
                  backgroundColor: getLoadColor(l.load),
                },
              ]}
            />
          );
        })}
      </View>
      <View style={styles.workingHoursContainer}>
        {WORKING_HOURS.map((v) => (
          <View style={{ alignItems: "center" }}>
            <Text>|</Text>
            <Text>{v}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundGray,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  loadContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: 16,
    maxHeight: 50,
  },
  header: {
    alignItems: "center",
  },
  loadItem: {
    flex: 1,
    borderRadius: 4,
  },
  workingHoursContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
