import { useState } from "react";
import { signin } from "../../api/api";
import AuthContent from "../../components/Auth/AuthContent";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { useAuth } from "../../context/authContext";
import { useExpenses } from "../../context/expensesContext";

export default function Signin() {
  const { authenticate } = useAuth();
  const { handleSetExpenses } = useExpenses();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleSignin = async (credentials) => {
    setIsLoading(true);
    try {
      const res = await signin(credentials);
      const user = res?.data;
      authenticate(user?.id);
      handleSetExpenses(user?.expenses);
    } catch (err) {
      setMessage(err?.response?.data?.message);
      authenticate(null);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) return <LoadingOverlay message="Signing in..." />;
  handleSetMessage = (message) => {
    setMessage(message);
  };
  return (
    <AuthContent
      isLogin
      onAuthenticate={handleSignin}
      message={message}
      handleSetMessage={handleSetMessage}
    />
  );
}
