import { USER_ACCESS_TOKEN } from "@/constants";
import { useStorageState } from "@/constants/async-storage";
import { useSession } from "@/context/auth-contex";
import LoginPage from "@/screens/login";
import { Redirect } from "expo-router";
import { View } from "react-native";

export default function Login() {
   const { token, loading } = useStorageState();

   console.log("token:", token)

  if(loading) return <View style={{ flex: 1, backgroundColor: '#fff' }}></View>

  if (token) {
    return <Redirect href="/(tabs)" />;
  }

  return <LoginPage/>
}
