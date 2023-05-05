import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthenticationContext } from "routes/authentication-context";
import { CommonActions } from "@react-navigation/native";
import { useContext } from "react";
import client from "api/client";
import { useStopRequestsQuery, useUserPhotoQuery } from "api/queries";
import UserAvatar from "react-native-user-avatar";

export const Account = ({ navigation }) => {
  const { userId, fullName, userType, signOut } = useContext(
    AuthenticationContext
  );
  let imgsrc;
  if (userType === "student") {
    imgsrc = require("../../assets/user4.png");
  } else if (userType === "admin") {
    imgsrc = require("../../assets/user5.png");
  } else if (userType === "driver") {
    imgsrc = require("../../assets/user1.png");
  }
  console.log(`userId from refetch ${userId}`);
  console.log(`userType from refetch: ${userType}`);
  console.log(`fullName from refetch: ${fullName}`);
  console.log(`userType from refetch: ${userType}`);
  const { data } = useStopRequestsQuery({
    isDriver: true,
    studentId: userId,
    requestStatus: "PENDING",
    rideStatus: "PENDING",
  });
  const { data: image } = useUserPhotoQuery(userId);

  function navigateToInbox() {
    navigation.push("Chats");
  }

  const Logout = async () => {
    console.log("logging out");
    try {
      await client.delete("/logout");
    } catch (error) {
      console.error({ message: "logout error", error });
    }
    await AsyncStorage.removeItem("authentication");
    signOut();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Start" }],
      })
    );
  };
  const EditProfile = async () => {
    navigation.push("EditProfile");
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ImageBackground
        source={require("../../assets/header.png")}
        style={{
          flex: 1,
          width: "100%",
          height: 280,
          borderRadius: 10,
          marginBottom: 100,
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              height: 150,
              width: 150,
              borderRadius: 10,
              marginTop: 300,
            }}
          >
            {/* <UserAvatar
              size={160}
              name={`${fullName}`}
              component={
                image ? (
                  <Image
                    source={{ uri: image }}
                    // source={require("../../assets/bus.png")}
                    style={{
                      width: 160,
                      height: 160,
                      borderRadius: 80,
                    }}
                  />
                ) : undefined
              }
            /> */}
            <UserAvatar
              size={160}
              name={`${fullName}`}
              component={
                <Image
                  // source={{ uri: image }}
                  source={imgsrc}
                  style={{
                    width: 200,
                    height: 210,
                    borderRadius: 300,
                    marginTop: "-10%",
                  }}
                />
              }
            />
          </View>

          <Text style={styles.nameTitle}>{fullName}</Text>
          <Pressable style={styles.editProfile}>
            <View>
              <TouchableOpacity width="100%" onPress={() => EditProfile()}>
                <Text style={{ fontSize: 16, color: "#43bfff" }}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </View>
      </ImageBackground>
      <ScrollView style={styles.mainDiv}>
        <View>
          <View style={styles.drawLine} />
          <View>
            <TouchableOpacity
              style={styles.optionsObject}
              onPress={() => navigation.push("Notification")}
            >
              <Text style={styles.options}>Notifications</Text>
              <Icon style={styles.icons} name="notifications" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        {/* <View>
          <View style={styles.drawLine} />
          <TouchableOpacity
            style={styles.optionsObject}
            onPress={() => navigation.push("Stop Requests")}
          >
            <Text style={styles.options}>Stop Requests </Text>
            {data && data.length > 0 && (
              <Icon
                name="alert-circle"
                size={24}
                color={"red"}
                style={{ marginLeft: 10, marginRight: "auto", marginTop: 10 }}
              />
            )}
            <Icon style={styles.icons} name="list" size={24} />
          </TouchableOpacity>
        </View> */}
        <View>
          <View style={styles.drawLine} />
          <TouchableOpacity
            onPress={() => navigation.push("Your Rides", { history: true })}
          >
            <View style={styles.optionsObject}>
              <Text style={styles.options}>Ride History</Text>
              <Icon style={styles.icons} name="time" size={24} />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.drawLine} />
          <TouchableOpacity onPress={() => navigateToInbox()}>
            <View style={styles.optionsObject}>
              <Text style={styles.options}>Reserved Rides</Text>
              <MaterialCommunityIcons
                style={styles.icons}
                name="bus"
                size={24}
              />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={Logout}>
          <View style={styles.drawLine} />
          <View style={[styles.optionsObject, { marginBottom: 20 }]}>
            <Text style={styles.options}>Log Out</Text>
            <MaterialCommunityIcons
              style={styles.icons}
              name="logout"
              color={"darkred"}
              size={24}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  mainDiv: {
    flex: 1,
    marginTop: 20,
    width: "100%",
  },
  editProfile: {
    fontSize: 28,
    borderWidth: "100%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    padding: 15,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: "gray",
    marginBottom: 20,
  },
  nameTitle: {
    fontSize: 28,
    margin: 20,
    fontWeight: "600",
    color: "#43bddd",
  },
  options: {
    marginTop: 10,
    paddingLeft: 20,
    fontSize: 16,
    fontWeight: "400",
  },
  drawLine: {
    borderBottomColor: "gray",
    marginTop: 20,
    borderBottomWidth: 0.4,
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  icons: {
    marginTop: 10,
    paddingRight: 20,
    fontSize: 25,
  },
  optionsObject: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
