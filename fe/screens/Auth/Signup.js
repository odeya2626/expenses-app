import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { signin, signup } from "../../api/api";
import AuthContent from "../../components/Auth/AuthContent";
import LoadingOverlay from "../../components/UI/LoadingOverlay";
import { useAuth } from "../../context/authContext";
import { GlobalStyles } from "../../constants/styles";

export default function Signup() {
  const { authenticate } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleSignin = async (credentials) => {
    setIsLoading(true);
    try {
      const res = await signup(credentials);

      if (res.status === 200) {
        try {
          const res = await signin({
            email: credentials.email,
            password: credentials.password,
          });
          const user = res?.data;
          authenticate(user);
        } catch (err) {
          setMessage(err?.response?.data?.message);
        }
      }
    } catch (err) {
      setMessage(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSetMessage = (message) => {
    setMessage(message);
  };
  if (isLoading) return <LoadingOverlay message="Signing up..." />;
  return (
    <View style={styles.constainer}>
      <AuthContent
        onAuthenticate={handleSignin}
        message={message}
        handleSetMessage={handleSetMessage}
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
