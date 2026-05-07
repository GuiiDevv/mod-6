import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>TaskApp</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 90,
    backgroundColor: "#1976d2"
  },
  headerText: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center"
  }
});