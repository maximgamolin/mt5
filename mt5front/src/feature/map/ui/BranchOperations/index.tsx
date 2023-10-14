import { StyleSheet, Text, View } from "react-native";
import { BranchOperation } from "../../../../API/types";
import { Button } from "../../../../shared/ui/Button";

export interface BranchOperationsProps {
  opertaions: BranchOperation[];
}

export const BranchOperations = ({ opertaions }: BranchOperationsProps) => {
  return (
    <View style={styles.container}>
      <Text>Доступные услуги</Text>
      <View style={styles.operations}>
        {opertaions.map((o) => {
          return <Button key={o.id} title={o.name} type="secondary" />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  operations: {
    gap: 10,
  },
});
