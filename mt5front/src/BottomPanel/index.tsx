import React from "react";
import { View, StyleSheet } from "react-native";

export function BottomPanel() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },

  header: {
    display: "flex",
    flexDirection: "row",
  },
});
