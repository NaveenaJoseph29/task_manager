import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";
import { Link } from "expo-router";
import { forgotPassword } from "@/src/services/authService";

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleForgotPassword = async () => {
      setLoading(true);
      try {
        const response = await forgotPassword(email);
        Alert.alert("Success", response.data.message || "Password reset link sent!");
      } catch (error:any) {
        Alert.alert("Error", error.message || "Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>Enter your email to reset your password.</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button mode="contained" onPress={handleForgotPassword} loading={loading} disabled={loading}>
        Send Reset Link
      </Button>
      <Link href="/auth/login" asChild>
        <Text style={styles.backToLogin}>Back to Login</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  backToLogin: {
    marginTop: 20,
    color: "#6200ee",
    fontWeight: "bold",
  },
});

export default ForgotPasswordScreen;
