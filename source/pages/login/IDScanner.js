import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
// import CustomButton from "../CustomButton/CustomButton";
import {
  Background,
  Logo,
  Header,
  Button,
  TextInput,
  BackButton,
} from "components";
import { theme } from "core";
import { idValidator } from "utils";
// import { useNavigation } from "@react-navigation/native";

export const IDScanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("No Scanned ID yet.");

  const onValidBarcode = () => {
    setScanned(false);
    navigation.navigate("Register");
  };
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log("Type: " + type + "\nData: " + data);
    navigation.navigate("Register", { barcodeData: data });
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <Background>
        <Header>Scan Your ID</Header>
        <Logo mode="Register" />
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </Background>
    );
  }
  // Return the View
  return (
    //   <View style={styles.container}> */}
    <Background>
      <Logo mode="Scanner"></Logo>
      <Header>Scan Your ID</Header>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <TextInput>{text}</TextInput>

      {/* {scanned && <Button onPress={onValidBarcode}>Continue</Button>} */}
    </Background>
  );
};

const styles = StyleSheet.create({
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: "100%",
    overflow: "hidden",
    borderRadius: 20,
  },
});
