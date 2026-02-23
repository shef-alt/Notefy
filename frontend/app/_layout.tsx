import { Stack } from "expo-router";
import { ContextProvider } from "@/context/context";

export default function RootLayout() {
  return (
    <ContextProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="note" />
      </Stack>
    </ContextProvider>
  );
}
