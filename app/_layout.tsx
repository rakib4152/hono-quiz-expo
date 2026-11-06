import React from 'react';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#0f172a',
            },
            headerTintColor: '#f8fafc',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            contentStyle: {
              backgroundColor: '#020617',
            },
            animation: 'slide_from_right',
          }}
        >
          {/* 1. Auth Screens */}
          <Stack.Screen name="auth/login" options={{ title: 'Login Screen', headerShown: false }} />
          <Stack.Screen name="auth/register" options={{ title: 'Register Screen', headerShown: false }} />

          {/* 2. Main Home Screen */}
          <Stack.Screen name="index" options={{ title: 'Home Screen', headerShown: false }} />

          {/* 3. Quiz Arena */}
          <Stack.Screen name="quiz/[id]" options={{ title: 'Quiz Screen', headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="quiz/result" options={{ title: 'Result Screen', headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="quiz/attempted" options={{ title: 'Attempted Answer Screen', headerShown: false }} />

          {/* 4. Secondary Feature Screens */}
          <Stack.Screen name="merit" options={{ title: 'Merit List Screen', headerShown: false }} />
          <Stack.Screen name="affiliate" options={{ title: 'Affiliate Screen', headerShown: false }} />
          <Stack.Screen name="settings" options={{ title: 'Settings Screen', headerShown: false }} />
        </Stack>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
