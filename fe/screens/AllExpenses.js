import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext, useExpenses } from "../context/expensesContext";
import { useContext } from "react";

export default function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const { expenses } = useExpenses();

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallbackText="No expenses found"
    />
  );
}
