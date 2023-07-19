import { createContext, useContext, useEffect, useState } from "react";
import {
  addExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "../api/api";
import { Alert } from "react-native";

export const ExpensesContext = createContext({
  expenses: [],
  handleSetExpenses: () => {},
  handleAddExpense: () => {},
  handleUpdateExpense: () => {},
  handleDeleteExpense: () => {},
  getUserExpenses: () => {},
});

export const useExpenses = () => useContext(ExpensesContext);

export default function ExpensesContextProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const handleSetExpenses = (expenses) => {
    setExpenses(expenses);
  };
  const handleAddExpense = async (expense) => {
    try {
      const res = await addExpense(expense);
      const newExpense = res?.data;
      if (res.status == 201) {
        setExpenses((prevExpenses) => {
          return [newExpense, ...prevExpenses];
        });
      }
    } catch (err) {
      Alert.alert("Error", err?.response?.data?.message);
    }
  };
  const handleUpdateExpense = async (id, expenseData) => {
    try {
      const res = await updateExpense(id, expenseData);
      const updatedExpense = res?.data?.data;
      if (res.status == 200) {
        setExpenses((prevExpenses) => {
          const updatableIndex = prevExpenses.findIndex(
            (expense) => expense.id === id
          );
          const updatedExpenses = [...prevExpenses];
          updatedExpenses[updatableIndex] = updatedExpense;
          return updatedExpenses;
        });
      }
    } catch (err) {
      Alert.alert("Error", err?.response?.data?.message);
    }
  };
  const handleDeleteExpense = async (id) => {
    try {
      const res = await deleteExpense(id);
      if (res.status == 204) {
        setExpenses((prevExpenses) => {
          return prevExpenses.filter((expense) => expense.id !== id);
        });
      }
    } catch (err) {
      Alert.alert("Error", err?.response?.data?.message);
    }
  };

  const getUserExpenses = async () => {
    try {
      hasMore && setIsLoading(true);
      const res = await getExpenses(limit, offset);
      const expenses = res?.data?.data;
      const hasMoreData = res?.data?.hasMoreData;

      if (res.status == 200) {
        setExpenses(expenses);
        setOffset((prevOffset) => prevOffset + 1);
        setHasMore(hasMoreData);
      }
    } catch (err) {
      Alert.alert("Error", err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserExpenses();
  }, []);

  const value = {
    expenses: expenses,
    handleSetExpenses: handleSetExpenses,
    handleAddExpense: handleAddExpense,
    handleUpdateExpense: handleUpdateExpense,
    handleDeleteExpense: handleDeleteExpense,
    getUserExpenses: getUserExpenses,
    isLoading: isLoading,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
