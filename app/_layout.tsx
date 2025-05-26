import { CustomModal } from "@/components/modal";
import { USER_ACCESS_TOKEN } from "@/constants";
import { SessionProvider, useSession } from "@/context/auth-contex";
import { PortalProvider } from "@/context/portal";
import { useStorageState } from "@/hooks/useStorageState";
import { initAPI } from "@/services/api";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import { LogBox } from "react-native";


export default function Layout() {
  useEffect(() => {
    initAPI()
  }, [])

  LogBox.ignoreAllLogs()

  return (
      <>
         <PortalProvider>
    <Stack screenOptions={{ headerShown: false}} >

      <SessionProvider>

          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="doctor-details" />
          <Stack.Screen name="learn-more" />
          <Stack.Screen name="new-test" />
          <Stack.Screen name="chat" />
          <Stack.Screen name="parent-chat-list" />
          <Stack.Screen name="login" />
          <Stack.Screen name="sign-up" />
        </SessionProvider>
    </Stack>

      </PortalProvider>
      </>
  );
}
