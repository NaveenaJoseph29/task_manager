import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, Provider as PaperProvider,Button } from 'react-native-paper';
import { AuthProvider, useAuth  } from '../src/context/AuthContext';
import { TaskProvider } from '../src/context/TaskContext';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#f6f6f6',
    surface: '#ffffff',
    error: '#B00020',
    text: '#000000',
    onSurface: '#000000',
    disabled: '#9e9e9e',
    placeholder: '#9e9e9e',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#f50057',
  },
  roundness: 4,
};
function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter(); 
  return (
    <Button
      mode="contained"
      onPress={() => logout(router)}  
    >
      Logout
    </Button>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <TaskProvider>
        <PaperProvider theme={theme}>
          <StatusBar style="auto" />
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              animation: 'slide_from_right',
              headerRight: () => <LogoutButton />,
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="auth/login" options={{ title: 'Login',headerShown: false}}/>
            <Stack.Screen name="auth/signup" options={{ title: 'Sign Up',headerShown: false}}/>
            <Stack.Screen name="tasks/index" options={{ title: 'My Tasks',headerShown: false }} />
            <Stack.Screen name="/request-password-reset" options={{ title: 'My Tasks',headerShown: false }} />
            <Stack.Screen name="/reset-password" options={{ title: 'My Tasks',headerShown: false }} />
          </Stack>
        </PaperProvider>
      </TaskProvider>
    </AuthProvider>
  );
}