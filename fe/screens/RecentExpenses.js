import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useExpenses } from "../context/expensesContext";

import { getDateMinusDays } from "../util/date";

export default function RecentExpenses() {
  const recentPeriod = 7;
  const { expenses } = useExpenses();
  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const datePeriodAgo = getDateMinusDays(today, recentPeriod);
    const expenseDate = new Date(expense.date);
    return expenseDate.getTime() >= datePeriodAgo.getTime();
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod={`Last ${recentPeriod} Days`}
      fallbackText="No recent expenses found"
    />
  );
}
