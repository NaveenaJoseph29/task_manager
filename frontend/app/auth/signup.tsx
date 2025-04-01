import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, Image,ScrollView } from "react-native";
import Icon from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, router } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { globalStyles } from '../../src/utils/styles';
import { Button } from "react-native-paper";
const RegisterScreen = () => {
  const [secureText, setSecureText] = useState(true);
  const [secureText1, setSecureText1] = useState(true);
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signup(name, email, password);
      router.replace('/tasks');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/Register.jpg")} style={styles.image} />
      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Please register to login.</Text>
      {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="phone" size={20} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
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
          <Icon name={secureText ? "eye-off" : "eye"} size={20} color="#666" style={styles.iconRight} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={secureText1}
          style={styles.input}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setSecureText1(!secureText1)}>
          <Icon name={secureText1 ? "eye-off" : "eye"} size={20} color="#666" style={styles.iconRight} />
        </TouchableOpacity>
      </View>

      <Button
          mode="contained"
          onPress={handleSignup}
          loading={loading}
          disabled={loading}
          style={globalStyles.button}
        >
          Sign Up
        </Button>

      <View style={styles.linkContainer}>
          <Text>Already have an account? </Text>
          <Link href="/auth/login" asChild>
            <Text style={styles.link}>Login</Text>
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
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  link: {
    color: '#6200ee',
    fontWeight: 'bold',
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
  rememberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  signUpButton: {
    backgroundColor: "#162D46",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  signUpText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  signInText: {
    marginTop: 20,
    color: "#666",
  },
  signInLink: {
    color: "#162D46",
    fontWeight: "bold",
  },
});

export default RegisterScreen;