export const isExpenseValid = (expense) => {
  const { title, amount, date } = expense;
  if (!title || !amount || !date) {
    // throw new Error("Invalid expense data");
    return false;
  }
  if (isNaN(expense.amount) || expense.amount <= 0) {
    // throw new Error("Invalid amount");
    return false;
  }
  if (expense.date.toString() === "Invalid Date") {
    // throw new Error("Invalid date");
    return false;
  }
  if (expense.title.trim().length <= 0) {
    // throw new Error("Invalid description");
    return false;
  }
  return true;
};
