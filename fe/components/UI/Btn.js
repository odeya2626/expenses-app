import { Pressable, View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function Btn({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary400,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: GlobalStyles.colors.primary0,
    textAlign: "center",
  },
  flatText: {
    color: GlobalStyles.colors.primary0,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
    fontWeight: "bold",
  },
});
