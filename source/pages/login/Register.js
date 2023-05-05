import React, { useEffect, useContext, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Keyboard } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "core";
import {
  emailValidator,
  passwordValidator,
  nameValidator,
  dateTimeFormatter,
  phoneValidator,
  birthDateValidator,
  idValidator,
} from "utils";
import PhoneInput from "react-native-phone-number-input";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Dropdown } from "react-native-element-dropdown";
import { Background, Logo, Button, TextInput, BackButton } from "components";
import { useCampusesQuery, useUniversitiesQuery } from "api/queries";
import { useCreateUserMutation } from "api/mutations";
import { AuthenticationContext } from "routes/authentication-context";

export const Register = ({ route, navigation }) => {
  const { barcodeData } = route.params;

  // const [firstName, setFirstName] = useState({ value: "", error: "" });
  // const [lastName, setLastName] = useState({ value: "", error: "" });
  const [studentID, setStudentID] = useState({ value: "", error: "" });
  const [fullName, setFullName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [phoneNumber, setPhoneNumber] = useState({ value: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [userType, setUserType] = useState({ value: "", error: "" });
  // const [birthDate, setBirthDate] = useState(new Date("2000-01-01"));
  // const [campus, setCampus] = useState({ value: "", label: "" });
  // const [universities, setUniversities] = useState([]);
  // const [university, setUniversity] = useState({ value: "", label: "" });

  // const [campuses, setCampuses] = useState([]);
  // const [Focus, setFocus] = useState(false);
  // const [CampusFocus, setCampusFocus] = useState(false);
  // const [dateTimePickerShown, setDateTimePickerShown] = useState(null);

  // const { data: uniQ } = useUniversitiesQuery();

  // const { data: campusQ, refetch: fetchCampuses } = useCampusesQuery(
  //   university.value
  // );
  const { mutate: createUser, data: registered } = useCreateUserMutation();

  const { signIn } = useContext(AuthenticationContext);
  console.log(barcodeData);
  // useEffect(() => {
  //   if (uniQ) {
  //     setUniversities(uniQ?.map((uni) => ({ value: uni.ID, label: uni.name })));
  //   }
  // }, [JSON.stringify(uniQ)]);

  // useEffect(() => {
  //   setCampuses(
  //     campusQ?.map((campus) => ({ value: campus.ID, label: campus.name }))
  //   );
  // }, [JSON.stringify(campusQ)]);

  // useEffect(() => {
  //   if (registered) {
  //     signIn(
  //       registered.accessToken,
  //       registered.userId,
  //       firstName.value,
  //       lastName.value
  //     );
  //     navigation.navigate("Home");
  //   }
  // }, [JSON.stringify(registered)]);
  // useEffect(() => {
  //   if (uniQ) {
  //     const universities = uniQ.map((uni) => ({
  //       value: uni.ID,
  //       label: uni.name,
  //     }));
  //     setUniversities(universities);
  //   }
  // }, [JSON.stringify(uniQ)]);
  // useEffect(() => {
  //   if (campusQ) {
  //     const campuses = campusQ.map((campus) => ({
  //       value: campus.ID,
  //       label: campus.name,
  //     }));
  //     setCampuses(campuses);
  //   }
  // }, [JSON.stringify(campusQ)]);
  useEffect(() => {
    console.log(registered);
    if (registered) {
      signIn(
        registered.accessToken,
        registered.userId,
        userType.value,
        fullName.value
        // firstName.value,
        // lastName.value
      );
      navigation.navigate("Home");
      // navigation.navigate("Login");
    }
    return () => {};
  }, [registered]);

  const RegisterClicked = async () => {
    // const firstnameError = nameValidator(firstName.value);
    // const lastnameError = nameValidator(lastName.value);
    const fullNameError = nameValidator(fullName.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const phoneError = phoneValidator(phoneNumber.value);
    const idError = idValidator(studentID.value);
    // const birthDateError = birthDateValidator(birthDate);

    if (
      emailError ||
      passwordError ||
      fullNameError ||
      phoneError ||
      idError
      // birthDateError
    ) {
      // setFirstName({ ...firstName, error: firstnameError });
      // setLastName({ ...lastName, error: lastnameError });
      setFullName({ ...fullName, error: fullNameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setStudentID({ ...studentID, error: idError });
      return;
    } else {
      setStudentID({ value: barcodeData, error: "" });
      setUserType({ value: "student", error: "" });
    }

    // if (!campus.value) {
    //   // return;
    //   campus.value = 1;
    // }

    const newUser = {
      studentID: studentID.value,
      studentName: fullName.value,
      studentEmail: email.value,
      studentPhoneNumber: phoneNumber.value,
      // dateOfBirth: birthDate.toISOString().substring(0, 10),
      // campusid: campus.value,
      studentPassword: password.value,
    };
    console.log(newUser);

    createUser(newUser);
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo mode="Register" />
      {/* {dateTimePickerShown && Platform.OS === "android" && (
        // <DateTimePicker
        //   value={birthDate}
        //   mode={dateTimePickerShown}
        //   onChange={(e, selectedDate) => {
        //     setBirthDate(selectedDate);
        //     setDateTimePickerShown(null);
        //   }}
        // />
      )} */}
      <ScrollView style={{ width: "100%", marginTop: 140 }}>
        <TextInput
          label="Full Name"
          returnKeyType="next"
          value={fullName.value}
          onChangeText={(text) => setFullName({ value: text, error: "" })}
          error={!!fullName.error}
          errorText={fullName.error}
        />
        {/* <TextInput
          label="Last Name"
          returnKeyType="next"
          value={lastName.value}
          onChangeText={(text) => setLastName({ value: text, error: "" })}
          error={!!lastName.error}
          errorText={lastName.error}
        /> */}
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />

        {/* {Platform.OS === "ios" ? (
          <DateTimePicker
            style={[styles.datePickerStyle]}
            themeVariant="light"
            value={birthDate}
            mode={"date"}
            onChange={(e, selectedDate) => {
              setBirthDate(selectedDate);
              setDateTimePickerShown(null);
            }}
          />
        ) : (
          <TouchableOpacity
            style={[styles.buttonDiv, { marginRight: 10 }]}
            onPress={() => setDateTimePickerShown("date")}
          >
            <Text style={styles.buttonText}>
              {dateTimeFormatter(birthDate, "date")}
            </Text>
          </TouchableOpacity>
        )} */}

        {/* <Dropdown
          data={universities}
          style={[styles.dropdown, Focus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!Focus ? "Select University" : "..."}
          searchPlaceholder="Search..."
          value={university}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(item) => {
            setUniversity(item);
            fetchCampuses();
            setFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={Focus ? "blue" : "black"}
              name="Safety"
              size={20}
            />
          )}
        /> */}
        {/* <Dropdown
          data={campuses}
          style={[styles.dropdown, CampusFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!CampusFocus ? "Select Campus" : "..."}
          searchPlaceholder="Search..."
          value={campus}
          onFocus={() => setCampusFocus(true)}
          onBlur={() => setCampusFocus(false)}
          onChange={(item) => {
            setCampus(item);
            setCampusFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={CampusFocus ? "blue" : "black"}
              name="Safety"
              size={20}
            />
          )}
        /> */}
        <PhoneInput
          containerStyle={{ width: "100%", marginVertical: 20 }}
          defaultValue={phoneNumber.value}
          defaultCode="LB"
          onChangeFormattedText={(text) => {
            setPhoneNumber({ value: text });
          }}
          withShadow
          disableArrowIcon
        />
      </ScrollView>

      <Button
        mode="contained"
        onPress={RegisterClicked}
        style={{ marginTop: 5 }}
      >
        continue
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("Login")}>
          <Text style={styles.link}>Login</Text>
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
  link: {
    fontWeight: "bold",
    color: "#43bddd",
  },
  phoneNumber: {
    flexDirection: "row",
    padding: 2,
  },
  // datePickerStyle: {
  //   width: "40%",
  //   marginLeft: 10,
  //   marginTop: 20,
  // },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "white",
    marginTop: 20,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 20,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
