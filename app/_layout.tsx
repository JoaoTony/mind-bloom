import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false}} >
      <Stack.Screen name="login" options={{}} />
      <Stack.Screen name="sign-up" options={{}} />
    </Stack>
  );
}
