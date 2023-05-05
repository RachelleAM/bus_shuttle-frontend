import React from "react";
import { Background, Logo, Header, Button } from "components";
import { Text } from "react-native-paper";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { theme } from "core";
export const Start = ({ navigation }) => {
  return (
    <Background mode="Start">
      <Header>LAU Bus Shuttle</Header>
      <Logo mode="Start" />
      <Button mode="contained" onPress={() => navigation.navigate("Login")}>
        Login
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate("IDScanner")}>
        Register
      </Button>
      {/* <Text style={styles.forgot}>Login as Admin or Bus Driver</Text> */}
      <View style={styles.row}>
        <Text>Login as </Text>
        <TouchableOpacity onPress={() => navigation.navigate("AdminLogin")}>
          <Text style={styles.link}>Admin</Text>
        </TouchableOpacity>
        <Text> or </Text>
        <TouchableOpacity onPress={() => navigation.navigate("DriverLogin")}>
          <Text style={styles.link}>Bus Driver</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 100,
  },
  forgot: {
    marginTop: 10,
    fontSize: 14,
    alignContent: "flex-start",
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: "#43bddd",
  },
});
