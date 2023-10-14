import { StyleSheet, Text, View } from "react-native";
import { BranchOperation } from "../../../../API/types";
import { Button } from "../../../../shared/ui/Button";

export interface BranchOperationsProps {
  opertaions: BranchOperation[];
}

export const BranchOperations = ({ opertaions }: BranchOperationsProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Доступные услуги</Text>
      <View style={styles.operations}>
        {opertaions.map((o) => {
          return <Button key={o.id} title={o.name} type="secondary" />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: "500",
  },
  container: {
    gap: 8,
  },
  operations: {
    gap: 10,
  },
});
