import { StyleSheet, Text, View } from "react-native";
import { BranchDataOut, TimeInLine } from "../../../../API/types";
import { COLORS } from "../../../../shared/constants";

export interface BranchInfoProps {
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

export const BranchInfo = ({ branch }: BranchInfoProps) => {
  return (
    <View>
      <View style={style.heading}>
        <Text style={style.title}>ВТБ Банк</Text>
        <Text style={[TIME_IN_LINE_CONFIG[branch.time_in_line], style.inLine]}>
          Время в очереди: {branch.time_in_line}
        </Text>
      </View>
      <View style={style.infoContainer}>
        <Text style={style.textTechnical}>
          {branch.croud_tendency?.msg} {branch.croud_tendency.symbol}
        </Text>

        <Text style={style.textTechnical}>
          Отделение:{" "}
          <Text
            style={{
              color: branch.when_opened.is_open ? COLORS.green : COLORS.red,
            }}
          >
            {branch.when_opened.msg}
          </Text>
        </Text>
      </View>

      <Text style={style.address}>{branch.address}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    fontSize: 18,
  },
  inLine: {
    fontSize: 12,
  },
  address: {
    fontSize: 14,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  textTechnical: {
    fontSize: 10,
  },
  infoContainer: {
    marginBottom: 14,
  },
});
