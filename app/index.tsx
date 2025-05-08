import { USER_ACCESS_TOKEN } from "@/constants";
import { useStorageState } from "@/constants/async-storage";
import { useSession } from "@/context/auth-contex";
import LoginPage from "@/screens/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";


export default function Login() {
   const { token, loading } = useStorageState();

   console.log("token:", token)

   useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem(USER_ACCESS_TOKEN);

      console.log("VALUE:", value)
    })()
   }, [])

  if(loading) return <View style={{ flex: 1, backgroundColor: '#fff' }}></View>

  if (token) {
    return <Redirect href="/(tabs)" />;
  }

  return <LoginPage />
}
