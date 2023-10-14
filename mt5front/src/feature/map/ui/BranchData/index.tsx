import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { StyleSheet, View } from "react-native";
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
    <BottomSheetScrollView
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
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    gap: 16,
    paddingHorizontal: 16,
  },
  selectedOfficeContainer: {
    backgroundColor: "white",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
});
