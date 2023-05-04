import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "core";

export const Header = (props) => {
  return <Text style={styles.header} {...props} />;
};

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    color: "#43bdc8",
    fontWeight: "bold",
    paddingVertical: 15,
  },
});
