import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Header } from "./Header";

export function Main() {
  return (
    <View style={styles.container}>
      <Header title="Отделения и банкоматы" />
      <Text>kek</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Platform.OS === "ios" ? 45 : 0,
    paddingBottom: 44,
  },
});
