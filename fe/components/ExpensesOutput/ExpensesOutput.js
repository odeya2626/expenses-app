import { View, StyleSheet, Text } from "react-native";
import ExpensesSum from "./ExpensesSum";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

export default function ExpensesOutput({
  expenses,
  expensesPeriod,
  fallbackText,
}) {
  let content = <Text style={styles.fallbackContent}>{fallbackText}</Text>;
  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpensesSum expenses={expenses} expensesPeriod={expensesPeriod} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary200,
  },
  fallbackContent: {
    color: GlobalStyles.colors.primary0,
    textAlign: "center",
    marginTop: 32,
    fontSize: 16,
  },
});
