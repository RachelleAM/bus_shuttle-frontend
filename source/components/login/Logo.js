import React from "react";
import { Image, StyleSheet, View } from "react-native";

export const Logo = ({ mode }) => {
  const logoSource =
    mode === "Register" ||
    mode === "Login" ||
    mode === "Reset" ||
    mode === "Scanner"
      ? require("../../assets/bus.png")
      : require("../../assets/logo.png");
  const styleSource =
    mode === "Register" ||
    mode === "Login" ||
    mode === "Reset" ||
    mode === "Scanner"
      ? styles.busHeader
      : styles.mainLogo;
  return (
    <View
      style={[
        styles.view,
        mode === "Register" && { marginTop: "30%", marginBottom: "-40%" },
        mode === "Login" && { marginTop: "10%", marginBottom: "20%" },
        mode === "Reset" && { marginTop: "-90%", marginBottom: "30%" },
        mode === "Scanner" && { marginTop: "10%", marginBottom: "20%" },
      ]}
    >
      <Image source={logoSource} style={[styleSource]} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainLogo: {
    width: 250,
    height: 250,
    marginBottom: 8,
  },
  busHeader: {
    width: 300,
    height: 100,
    marginBottom: -3,
  },
  view: {
    paddingHorizontal: "50%",
    paddingTop: "5%",
  },
});
