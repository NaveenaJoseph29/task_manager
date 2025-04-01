// import React, { useState } from 'react';
// import { View, ScrollView, StyleSheet } from 'react-native';
// import { TextInput, Button, Text, Surface } from 'react-native-paper';
// import { Link, router } from 'expo-router';
// import { useAuth } from '../../src/context/AuthContext';
// import { globalStyles } from '../../src/utils/styles';

// export default function LoginScreen() {
//   const { login } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleLogin = async () => {
//     console.log('Attempting login...');
//     try {
//       await login(email, password);
//       console.log('Login successful, navigating to tasks...');
//       router.replace('/tasks');
//     } catch (err) {
//       console.error('Login error:', err);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Surface style={styles.surface}>
//         <Text style={styles.title}>Welcome Back</Text>
        
//         {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}
        
//         <TextInput
//           label="Email"
//           value={email}
//           onChangeText={setEmail}
//           style={globalStyles.input}
//           keyboardType="email-address"
//           autoCapitalize="none"
//           autoComplete="email"
//         />
        
//         <TextInput
//           label="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           style={globalStyles.input}
//           autoCapitalize="none"
//         />
        
//         <Button
//           mode="contained"
//           onPress={handleLogin}
//           loading={loading}
//           disabled={loading}
//           style={globalStyles.button}
//         >
//           Login
//         </Button>
        
//         <View style={styles.linkContainer}>
//           <Text>Don't have an account? </Text>
//           <Link href="/auth/signup" asChild>
//             <Text style={styles.link}>Sign Up</Text>
//           </Link>
//         </View>
//       </Surface>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 16,
//     justifyContent: 'center',
//   },
//   surface: {
//     padding: 24,
//     elevation: 4,
//     borderRadius: 8,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 24,
//     textAlign: 'center',
//   },
//   linkContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 16,
//   },
//   link: {
//     color: '#6200ee',
//     fontWeight: 'bold',
//   },
// });
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, Image ,ScrollView} from "react-native";
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
      {/* Username Input */}
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

      {/* Password Input */}
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

      {/* Sign In Button */}
      {/* <TouchableOpacity onPress={handleLogin} style={styles.signInButton}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity> */}
      <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
          style={globalStyles.button}
        >
          Login
        </Button>

      {/* Sign Up Link */}
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
  signInButton: {
    backgroundColor: "#162D46",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  signInText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  signUpText: {
    marginTop: 20,
    color: "#666",
  },
  signUpLink: {
    color: "#162D46",
    fontWeight: "bold",
  },
});

export default LoginScreen;