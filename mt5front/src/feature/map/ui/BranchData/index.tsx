import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BranchDataOut, TimeInLine } from "../../../../API/types";
import { COLORS } from "../../../../shared/constants";
import { Button } from "../../../../shared/ui/Button";
import { BranchBusy } from "../BranchBusy";
import { BranchOperations } from "../BranchOperations";

export interface BranchDataProps {
  branch: BranchDataOut;
}
const TIME_IN_LINE_CONFIG: Record<TimeInLine, { color: string }> = {
  "15 - 20 минут": {
    color: COLORS.orange,
  },
  "5 - 7 минут": {
    color: COLORS.green,
  },
  "от 30 минут": {
    color: COLORS.red,
  },
};

export const BranchData = ({ branch }: BranchDataProps) => {
  return (
    <ScrollView style={styles.selectedOfficeContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 24 }}>ВТБ Банк</Text>
        <Text style={TIME_IN_LINE_CONFIG[branch.time_in_line]}>
          Время в очереди: {branch.time_in_line}
        </Text>
      </View>
      <Text>{branch.croud_tendency?.msg}</Text>

      <Text>
        Отделение:{" "}
        <Text
          style={{
            color: branch.when_opened.is_open ? COLORS.green : COLORS.red,
          }}
        >
          {branch.when_opened.msg}
        </Text>
      </Text>

      <Text>{branch.address}</Text>

      <View style={styles.actions}>
        <Button title="Построить маршрут" type="primary" />
        <Button title="Электронная очередь" type="secondary" />
      </View>

      <BranchBusy load={branch.load} />

      <BranchOperations opertaions={branch.operations} />
    </ScrollView>
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
    paddingBottom: 32,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
});
