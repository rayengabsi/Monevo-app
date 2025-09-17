// app/_layout.tsx
import { Stack } from 'expo-router';
import { AuthProvider } from '../config/contexts/authContext'; // Adjust the import path based on your file location

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AuthProvider>
  );
}