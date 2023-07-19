import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

export default function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
}

function renderExpenseItem({ item }) {
  return <ExpenseItem {...item} />;
}
