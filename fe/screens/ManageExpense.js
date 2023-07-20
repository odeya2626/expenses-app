import { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import IconBtn from "../components/UI/IconBtn";
import { GlobalStyles } from "../constants/styles";

import { useExpenses } from "../context/expensesContext";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

export default function ManageExpense({ route, navigation }) {
  const {
    handleAddExpense,
    handleUpdateExpense,
    expenses,
    handleDeleteExpense,
  } = useExpenses();
  const editedExpenseId = route.params?.id;
  const isEditMode = !!editedExpenseId;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditMode ? "Edit Expense" : "Add Expense",
      headerRight: ({ tintColor }) => (
        <IconBtn
          icon="trash"
          size={24}
          color={tintColor}
          onPress={handleDelete}
        />
      ),
    });
  }, [navigation, isEditMode]);

  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );
  const handleDelete = () => {
    handleDeleteExpense(editedExpenseId);
    navigation.goBack();
  };
  const handleCancel = () => {
    navigation.goBack();
  };
  const onSubmit = (expenseData) => {
    if (isEditMode) {
      handleUpdateExpense(editedExpenseId, expenseData);
    } else {
      handleAddExpense(expenseData);
    }
    navigation.goBack();
  };
  return (
    <View style={styles.constainer}>
      <ExpenseForm
        onCancel={handleCancel}
        isEditMode={isEditMode}
        onSubmit={onSubmit}
        defaultValues={selectedExpense}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary200,
  },
});
