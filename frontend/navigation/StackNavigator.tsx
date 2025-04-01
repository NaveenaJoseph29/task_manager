import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../app/auth/login";
import SignupScreen from "../app/auth/signup";
import HomeScreen from "../app/index";
import { useAuth } from "../src/context/AuthContext";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
        </>
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
    </Stack.Navigator>
  );
}
