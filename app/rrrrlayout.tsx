import { USER_ACCESS_TOKEN } from "@/constants";
import { SessionProvider } from "@/context/auth-contex";
import { initAPI } from "@/services/api";
import { Slot, Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    initAPI()
  }, [])

  return (
    <SessionProvider>
     <Slot/>
    </SessionProvider>
  );
}
