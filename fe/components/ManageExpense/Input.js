import { Text, TextInput, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function Input({ label, textInputConfig, style, invalid }) {
  const inputStyles = [styles.input];
  if (textInputConfig?.multiline) {
    inputStyles.push(styles.inputMultiline);
  }
  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary0,
    marginBottom: 10,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary800,
    borderRadius: 6,
    padding: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary0,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error,
  },
  invalidInput: {
    borderColor: GlobalStyles.colors.error,
    backgroundColor: GlobalStyles.colors.error50,
  },
});
