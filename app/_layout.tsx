import { Slot, Stack } from 'expo-router';
Slot;

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
