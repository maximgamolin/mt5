import { ScrollView, StyleSheet, View } from "react-native";
import { BranchDataOut } from "../../../../API/types";
import { Button } from "../../../../shared/ui/Button";
import { BranchBusy } from "../BranchBusy";
import { BranchInfo } from "../BranchInfo";
import { BranchOperations } from "../BranchOperations";

export interface BranchDataProps {
  branch: BranchDataOut;
}

export const BranchData = ({ branch }: BranchDataProps) => {
  return (
    <ScrollView
      style={styles.selectedOfficeContainer}
      contentContainerStyle={styles.content}
    >
      <BranchInfo branch={branch} />

      <View style={styles.actions}>
        <Button title="Построить маршрут" type="primary" />
        <Button title="Электронная очередь" type="secondary" />
      </View>

      {Boolean(branch.load?.length) && <BranchBusy load={branch.load} />}

      {Boolean(branch.operations.length) && (
        <BranchOperations opertaions={branch.operations} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    gap: 16,
  },
  selectedOfficeContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 32,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
});
