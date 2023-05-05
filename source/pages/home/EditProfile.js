import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import moment from "moment";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "routes/authentication-context";
import { useUserDetailsQuery, useUserPhotoQuery } from "api/queries";
// import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useUpdateUserMutation,
  useUpdateUserPhotoMutation,
  useuploadUserLicenseMutation,
} from "api/mutations";
import UserAvatar from "react-native-user-avatar";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { theme } from "core";
import {
  Background,
  Logo,
  Header,
  Button,
  TextInput,
  BackButton,
} from "components";
export const EditProfile = ({ navigation }) => {
  const { userId, fullName: defaultfullName } = useContext(
    AuthenticationContext
  );
  const { mutate: updateUser, isSuccess: isSuccessUser } =
    useUpdateUserMutation();
  // const { mutate: updateUserPhoto, isSuccess: isSuccessPhoto } =
  //   useUpdateUserPhotoMutation();
  // const { mutate: uploadUserLicense, isSuccess: isSuccessLicense } =
  //   useuploadUserLicenseMutation();
  const { data: image } = useUserPhotoQuery(userId);
  var { data } = useUserDetailsQuery(userId);
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const campuses = ["Byblos", "Beirut"];
  const [fullName, setFullName] = useState({ value: "", error: "" });
  const [campus, setCampus] = useState({ value: "", error: "" });
  const [address, setAddress] = useState({ value: "", error: "" });
  const [phoneNumber, setPhoneNumber] = useState({ value: "", error: "" });
  // const [dateOfBirth, setDateOfBirth] = useState("");

  useEffect(() => {
    if (data) {
      setFullName(data?.fullName);
      setPhoneNumber(data?.phoneNumber);
      setCampus(data?.campus);
      setAddress(data?.address);
      // setDateOfBirth(data?.dateOfBirth ? data.dateOfBirth.split("T")[0] : "");
    }
  }, [JSON.stringify(data)]);
  // useEffect(() => {
  //   if (isSuccessLicense) navigation.goBack();
  // }, [isSuccessLicense]);
  // useEffect(() => {
  //   if (isSuccessPhoto) navigation.goBack();
  // }, [isSuccessPhoto]);
  useEffect(() => {
    if (isSuccessUser) navigation.goBack();
  }, [isSuccessUser]);
  const onSave = () => {
    console.log("save");
    if (
      fullName.value.length > 0 &&
      address.value.length > 0 &&
      campus.value.length > 0 &&
      phoneNumber.value.length == 12
    ) {
      //safe to update data
      var data = {
        id: userId,
        fullName: fullName.value,
        mainCampus: campus.value,
        address: address.value,
        phoneNumber: phoneNumber.value,
      };
      console.log(`data in edit: ${data}`);
      updateUser(data);
    }
    //else do nothing
  };
  // const checkBirthValidity = () => {
  //   return moment(dateOfBirth.replace(/-/g, "-")).isValid();
  // };

  // const handleChoosePhoto = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [3, 3],
  //     base64: true,
  //     quality: 1,
  //   });

  //   if (!result.cancelled) {
  //     const formData = new FormData();
  //     formData.append("base64", JSON.stringify(result.base64));
  //     updateUserPhoto(formData);
  //   }
  // };

  // const uploadDrivingLicense = async () => {
  //   // No permissions request is necessary for launching the image library
  //   const permission = await Permissions.getAsync(Permissions.CAMERA);
  //   if (permission.status !== "granted") {
  //     const newPermission = await Permissions.askAsync(Permissions.CAMERA);
  //     if (newPermission.status === "granted") {
  //       console.log(newPermission);
  //     }
  //   }

  //   let result = await ImagePicker.launchCameraAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.cancelled) {
  //     const image = {
  //       uri:
  //         Platform.OS === "android"
  //           ? result.uri
  //           : result.uri.replace("file://", ""),
  //       name: result.uri.substring(
  //         result.uri.lastIndexOf("/") + 1,
  //         result.uri.length
  //       ),
  //       type: `image/${result.uri.substr(result.uri.lastIndexOf(".") + 1)}`,
  //       id: userId,
  //     };
  //     uploadUserLicense(image);
  //   }
  // };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      {/* <Logo mode="Login" /> */}
      {/* <Header>Edit Profile</Header> */}
      <UserAvatar
        size={160}
        name={`${fullName}`}
        component={
          <Image
            // source={{ uri: image }}
            source={require("../../assets/user5.png")}
            style={{
              width: 180,
              height: 185,
              borderRadius: 300,
              marginBottom: "12%",
            }}
          />
        }
      />
      <TextInput
        label="Full Name"
        returnKeyType="next"
        value={fullName}
        onChangeText={(text) => setFullName({ value: text, error: "" })}
      />
      <TextInput
        label="Phone Number"
        returnKeyType="next"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber({ value: text, error: "" })}
      />

      <TextInput
        label="Address"
        returnKeyType="next"
        value={address}
        onChangeText={(text) => setAddress({ value: text, error: "" })}
      />
      <TextInput
        label="Main Campus (Beirut or Byblos)"
        returnKeyType="next"
        value={campus}
        onChangeText={(text) => setCampus({ value: text, error: "" })}
      />
      {/* <DropDownPicker
        items={[
          { label: "Byblos", value: "Byblos" },
          { label: "Beirut", value: "Beirut" },
        ]}
        defaultValue={campus}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: "#fafafa" }}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        dropDownStyle={{ backgroundColor: "#fafafa" }}
        onChangeText={(item) => setCampus(item.value)}
      ></DropDownPicker> */}
      <Button mode="contained" onPress={onSave}>
        Save
      </Button>
    </Background>
  );
};

//     <View style={{ height: "100%" }}>
//       <ImageBackground
//         source={require("../../assets/bus.png")}
//         style={{
//           flex: 1,
//           width: null,
//           height: 150,
//           borderRadius: 10,
//         }}
//       ></ImageBackground>
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "center",
//           marginBottom: 40,
//         }}
//       >
//         {/* <Text style={{ fontSize: 20, fontWeight: "500",marginTop:100, }}>My Profile</Text> */}
//       </View>
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "center",
//           alignContent: "center",
//           alignItems: "center",
//           marginTop: 30,
//         }}
//       >
//         <UserAvatar
//           size={120}
//           name={`${defaultFirstName} ${defaultLastName}`}
//           component={
//             image ? (
//               <Image
//                 source={{ uri: image }}
//                 style={{
//                   width: 120,
//                   height: 120,
//                   borderRadius: 60,
//                 }}
//               />
//             ) : undefined
//           }
//         />
//       </View>
//       {/* <Button title="Change Photo" onPress={handleChoosePhoto} /> */}
//       <ScrollView>
//         {/* <View style={{ marginTop: 30, marginLeft: 20, flexDirection: "row" }}> */}
//         <View>
//           <View>
//             <TextInput
//               label="Full Name"
//               returnKeyType="next"
//               value={fullName}
//               onChangeText={(text) => setFullName(value)}
//             />
//             <TextInput
//               key={"Full Name"}
//               style={
//                 fullName.length === 0
//                   ? { borderWidth: 1, borderColor: "red" }
//                   : { borderWidth: 0 }
//               }
//               value={fullName}
//               onChangeText={(text) => setFullName(text)}
//             />
//           </View>
//         </View>
//         <View style={{ marginTop: 20, marginLeft: 20, width: "90%" }}>
//           <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 5 }}>
//             Phone Number
//           </Text>
//           <TextInput
//             style={
//               phoneNumber.length !== 12
//                 ? { borderWidth: 1, borderColor: "red" }
//                 : { borderWidth: 0 }
//             }
//             value={phoneNumber}
//             onChangeText={(text) => setPhoneNumber(text)}
//           />
//         </View>
//         {/* <View style={{ marginTop: 20, marginLeft: 20, width: "90%" }}>
//           <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 5 }}>
//             Date Of Birth
//           </Text>
//           <TextInput
//             style={
//               checkBirthValidity()
//                 ? { borderWidth: 0 }
//                 : { borderWidth: 1, borderColor: "red" }
//             }
//             value={dateOfBirth}
//             onChangeText={(text) => setDateOfBirth(text)}
//           />
//         </View> */}

//         <View style={{ marginTop: 20, width: "90%", marginLeft: 20 }}>
//           <TouchableOpacity
//             onPress={() => onSave()}
//             style={{ backgroundColor: "green", height: 40, borderRadius: 10 }}
//           >
//             <View style={{ flexDirection: "row" }}>
//               <Text
//                 style={{
//                   width: "50%",
//                   marginLeft: 20,
//                   marginTop: 10,
//                   color: "white",
//                   fontSize: 16,
//                   fontWeight: "500",
//                 }}
//               >
//                 Save
//               </Text>
//               <View
//                 style={{ alignItems: "flex-end", width: "50%", marginTop: 4 }}
//               >
//                 <Icon
//                   name={"arrow-forward-sharp"}
//                   size={30}
//                   color={"white"}
//                   style={{ marginRight: 30 }}
//                 />
//               </View>
//             </View>
//           </TouchableOpacity>
//         </View>
//         <View
//           style={{
//             marginTop: 20,
//             marginLeft: 20,
//             width: "90%",
//             marginBottom: 50,
//           }}
//         >
//           {/* <TouchableOpacity
//             onPress={() => {
//               uploadDrivingLicense();
//             }}
//           >
//             <Text
//               style={{
//                 borderRadius: 5,
//                 borderWidth: 2,
//                 padding: 10,
//                 borderColor: "#33B6FC",
//                 fontSize: 20,
//                 textAlign: "center",
//               }}
//             >
//               Upload Driving License
//             </Text>
//           </TouchableOpacity> */}
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  drawLine: {
    borderBottomColor: "gray",
    marginTop: 20,
    borderBottomWidth: 0.8,
    width: "100%",
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 12,
    color: theme.colors.secondary,
  },
});
