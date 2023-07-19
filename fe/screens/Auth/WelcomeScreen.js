import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function WelcomeScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text style={[styles.title, styles.textColor]}>Welcome!</Text>
      <Text style={styles.textColor}>You logged in successfully!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  textColor: {
    color: GlobalStyles.colors.white,
  },
});
