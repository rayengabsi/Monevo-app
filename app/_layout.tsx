// app/_layout.tsx
import { Stack } from 'expo-router';
import { AuthProvider } from '../config/contexts/authContext';
import { StyleSheet } from 'react-native';
import React from 'react';

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="(modals)/profileModal" 
        options={{ 
          presentation: "modal",
          headerShown: true,
          headerTitle: "Edit Profile",
          headerBackTitle: "Cancel"
        }} 
      />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
}