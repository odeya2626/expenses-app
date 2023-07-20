import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import { GlobalStyles } from "./constants/styles";
import ManageExpense from "./screens/ManageExpense";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import { Ionicons } from "@expo/vector-icons";
import IconBtn from "./components/UI/IconBtn";

import Signin from "./screens/Auth/Signin";
import Signup from "./screens/Auth/Signup";
import AuthContextProvider, { useAuth } from "./context/authContext";
import WelcomeScreen from "./screens/Auth/WelcomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExpensesContextProvider from "./context/expensesContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary800 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: GlobalStyles.colors.primary0 },
      }}
    >
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}
function AuthenticatedStack() {
  const { logoutAuth } = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary800 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: GlobalStyles.colors.primary0 },
      }}
    >
      <Stack.Screen
        name="Expenses"
        component={ExpensesOverview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageExpense"
        component={ManageExpense}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconBtn
              icon="exit"
              size={24}
              color={tintColor}
              onPress={logoutAuth}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function Navigation() {
  const { isAuthenticated } = useAuth();
  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && (
        <ExpensesContextProvider>
          <AuthenticatedStack />
        </ExpensesContextProvider>
      )}
    </NavigationContainer>
  );
}
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
function ExpensesOverview() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary800 },
        headerTintColor: GlobalStyles.colors.primary0,
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary800,
          color: GlobalStyles.colors.primary0,
        },
        tabBarActiveTintColor: GlobalStyles.colors.primary0,
        tabBarInactiveTintColor: GlobalStyles.colors.primary400,
        headerRight: ({ tintColor }) => (
          <IconBtn
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpense");
            }}
          />
        ),
      })}
    >
      <Tab.Screen
        name="AllExpenses"
        options={{
          title: "All Expenses",
          tabBarLabel: "All",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
        component={AllExpenses}
      />
      <Tab.Screen
        name="RecentExpenses"
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
        component={RecentExpenses}
      />
    </Tab.Navigator>
  );
}
