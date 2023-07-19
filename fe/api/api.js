import axios from "axios";
import Constants from "expo-constants";

const api = axios.create({
  baseURL: Constants.manifest.extra.apiUrl,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

api.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
api.defaults.headers.common["Access-Control-Allow-Headers"] =
  "Origin, X-Requested-With, Content-Type, Accept";

// All req for authentication
export const signup = (userInfo) => api.post("/register", userInfo);
export const signin = (userInfo) => api.post("/login", userInfo);
export const getUser = () => api.get("/user");
export const logout = () => api.post("/logout");

// All req for expenses
export const getExpenses = (limit, offset) =>
  api.get(`/expenses?limit=${limit}&offset=${offset}`);
export const addExpense = (expense) => api.post("/expenses", expense);
export const updateExpense = (id, expense) =>
  api.put(`/expenses/${id}`, expense);
export const deleteExpense = (expenseId) =>
  api.delete(`/expenses/${expenseId}`);
