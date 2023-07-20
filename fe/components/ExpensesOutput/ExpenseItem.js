import { Pressable, View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

export default function ExpenseItem({ id, title, amount, date }) {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("ManageExpense", { id, title, amount, date });
  };
  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expeenseItem}>
        <View>
          <Text style={[styles.textBase, styles.title]}>{title}</Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>{`$${amount.toFixed(2)}`}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expeenseItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: GlobalStyles.colors.primary800,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    shadowColor: GlobalStyles.colors.primary500,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary0,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  amountContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: GlobalStyles.colors.primary0,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80,
  },
  amountText: {
    color: GlobalStyles.colors.primary800,
    fontWeight: "bold",
  },
});
