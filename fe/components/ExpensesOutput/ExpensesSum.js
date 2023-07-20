import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function ExpensesSum({ expenses, expensesPeriod }) {
  const expensesSum = expenses.reduce((acc, expense) => {
    return acc + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{expensesPeriod}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary0,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary0,
  },
});
