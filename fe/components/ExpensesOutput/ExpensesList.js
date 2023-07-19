import { ActivityIndicator, FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";
import { useExpenses } from "../../context/expensesContext";

export default function ExpensesList({ expenses }) {
  const { getUserExpenses, isLoading } = useExpenses();
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      onEndReachedThreshold={0.1}
      onEndReached={getUserExpenses}
      ListFooterComponent={isLoading && <ActivityIndicator />}
    />
  );
}

function renderExpenseItem({ item }) {
  return <ExpenseItem {...item} />;
}
