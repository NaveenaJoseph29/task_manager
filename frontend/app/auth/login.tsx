import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { Link, router } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { globalStyles } from '../../src/utils/styles';
import { Button } from "react-native-paper";

const LoginScreen = () => {
  const [secureText, setSecureText] = useState(true);
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    console.log('Attempting login...');
    try {
      await login(email, password);
      console.log('Login successful, navigating to tasks...');
      router.replace('/tasks');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/login.jpg")} style={styles.image} />
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Please Sign in to continue.</Text>
      {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
          style={styles.input}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Icon name={secureText ? "eye-slash" : "eye"} size={20} color="#666" style={styles.iconRight} />
        </TouchableOpacity>
      </View>

      {/* Forgot Password Link */}
      <Link href="/auth/forgot-password" asChild>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </Link>

      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={globalStyles.button}
      >
        Login
      </Button>

      <View style={styles.linkContainer}>
        <Text>Don't have an account? </Text>
        <Link href="/auth/signup" asChild>
          <Text style={styles.link}>Sign Up</Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  forgotPasswordText: {
    alignSelf: "flex-end",
    marginBottom: 10,
    color: "#6200ee",
    fontWeight: "bold",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  link: {
    color: "#6200ee",
    fontWeight: "bold",
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%",
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  iconRight: {
    padding: 10,
  },
});

export default LoginScreen;
