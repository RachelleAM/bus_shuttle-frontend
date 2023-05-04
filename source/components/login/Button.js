import React from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "core";

export const Button = ({ mode, style, ...props }) => {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === "outlined" && { backgroundColor: theme.colors.secondary },
        style,
      ]}
      labelStyle={[styles.text, mode === "outlined" && { color: "white" }]}
      mode={mode}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10,
    paddingVertical: 2,
    backgroundColor: "#43bdc8",
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
    color: "white",
  },
});
