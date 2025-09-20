import { Stack } from 'expo-router';

export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
        animation: 'slide_from_bottom',
      }}
    >
      <Stack.Screen
        name="profileModal"
        options={{
          headerShown: false,
          presentation: 'modal',
          title: '',
        }}
      />
    </Stack>
  );
}