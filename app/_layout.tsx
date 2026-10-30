import React from 'react';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

// Create a single stable QueryClient instance with robust defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0f172a', // Slate 900
          },
          headerTintColor: '#f8fafc',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: '#090d16',
          },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'QuizPulse',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="quiz/[id]"
          options={{
            title: 'Quiz Arena',
            headerShown: false,
            gestureEnabled: false, // Prevent accidental swipe back mid-quiz
          }}
        />
        <Stack.Screen
          name="quiz/result"
          options={{
            title: 'Quiz Performance',
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
