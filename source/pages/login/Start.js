import React from "react";
import { Background, Logo, Header, Button, Paragraph } from "components";

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
    </Background>
  );
};
