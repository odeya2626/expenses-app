import { createContext, useContext, useState } from "react";
import { logout } from "../api/api";
import { Alert } from "react-native";
export const AuthContext = createContext({
  userId: null,
  isAuthenticated: false,
  authenticate: () => {},
  logoutAuth: () => {},
});

export const useAuth = () => useContext(AuthContext);
export default function AuthContextProvider({ children }) {
  const [userId, setUserId] = useState(null);

  const authenticate = (userId) => {
    setUserId(userId);
  };

  const logoutAuth = async () => {
    setUserId(null);
    try {
      const res = await logout();
    } catch (err) {
      Alert.alert("Error", err?.response?.data?.message);
    }
  };
  const value = {
    userId: userId,
    isAuthenticated: !!userId,
    authenticate: authenticate,
    logoutAuth: logoutAuth,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
