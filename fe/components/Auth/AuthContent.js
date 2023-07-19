import { useState } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";

import AuthForm from "./AuthForm";
import { GlobalStyles } from "../../constants/styles";
import Btn from "../UI/Btn";
import { useNavigation } from "@react-navigation/native";

export default function AuthContent({
  isLogin,
  onAuthenticate,
  message = "",
  handleSetMessage,
}) {
  const navigation = useNavigation();
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Signin");
    }
  }

  function submitHandler(credentials) {
    let { email, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;

    if (!emailIsValid || !passwordIsValid || (!isLogin && !passwordsAreEqual)) {
      if (!emailIsValid) {
        Alert.alert("Invalid email", "Please enter a valid email address.");
      }
      if (!passwordIsValid) {
        Alert.alert(
          "Invalid password",
          "Password must be at least 7 characters long."
        );
      } else {
        Alert.alert("Invalid input", "Please check your entered data.");
      }
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
        handleSetMessage={handleSetMessage}
      />
      <Text style={message ? styles.message : styles.none}>
        {message && message[0].toUpperCase() + message.slice(1)}
      </Text>
      <View style={styles.buttons}>
        <Btn onPress={switchAuthModeHandler} mode="flat">
          {isLogin ? "Create a new user" : "Log in instead"}
        </Btn>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.primary300,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
  message: {
    fontSize: 16,
    marginTop: 12,
    color: GlobalStyles.colors.error,
  },
  none: {
    display: "none",
  },
});
