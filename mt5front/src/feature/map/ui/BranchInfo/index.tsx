import { StyleSheet, Text, View } from "react-native";
import { BranchDataOut } from "../../../../API/types";
import { COLORS } from "../../../../shared/constants";
import { getColorByTimeInLine } from "../../api";

export interface BranchInfoProps {
  branch: BranchDataOut;
}

export const BranchInfo = ({ branch }: BranchInfoProps) => {
  return (
    <View>
      <View style={style.heading}>
        <Text style={style.title}>ВТБ Банк</Text>
        {Boolean(branch.time_in_line) && (
          <Text
            style={[getColorByTimeInLine(branch.time_in_line), style.inLine]}
          >
            Время в очереди: {branch.time_in_line}
          </Text>
        )}
      </View>
      <View style={style.infoContainer}>
        {Boolean(branch.croud_tendency) && (
          <Text style={style.textTechnical}>
            {branch.croud_tendency?.msg} {branch.croud_tendency?.symbol}
          </Text>
        )}

        <Text style={style.textTechnical}>
          Отделение:{" "}
          {branch.when_opened ? (
            <Text
              style={{
                color: branch.when_opened?.is_open ? COLORS.green : COLORS.red,
              }}
            >
              {branch.when_opened?.msg}
            </Text>
          ) : (
            <Text style={{ color: COLORS.red }}>Закрыто</Text>
          )}
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
