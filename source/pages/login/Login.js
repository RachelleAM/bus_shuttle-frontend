import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import {
  Background,
  Logo,
  Header,
  Button,
  TextInput,
  BackButton,
} from "components";
import { theme } from "core";
import { emailValidator, passwordValidator } from "utils";
import { AuthenticationContext } from "routes/authentication-context";
import { useLoginUserMutation } from "api/mutations";

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const { mutate: LoginUser, data: loggedin } = useLoginUserMutation();

  const { signIn } = useContext(AuthenticationContext);

  useEffect(() => {
    if (loggedin) {
      signIn(
        loggedin.accessToken,
        loggedin.userId,
        loggedin.userType,
        loggedin.fullName
        // loggedin.firstName,
        // loggedin.lastName
      );
      navigation.navigate("Home", { loggedInId: loggedin.userId });
    }
  }, [loggedin]);
  console.log("loggedin", loggedin);
  const Auth = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    const user = {
      studentEmail: email.value,
      studentPassword: password.value,
    };
    LoginUser(user);
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo mode="Login" />
      <Header>Welcome Back!</Header>
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={Auth}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("IDScanner")}>
          <Text style={styles.link}>Register</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
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

  link: {
    fontWeight: "bold",
    color: "#43bddd",
  },
});
