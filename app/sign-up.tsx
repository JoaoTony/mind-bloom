import { USER_ACCESS_TOKEN } from "@/constants";
import { useStorageState } from "@/constants/async-storage";
import SignUpPage from "@/screens/Sign-up";
import { Redirect } from "expo-router";
import { View } from "react-native";

export default function SignUp() {
   const { token, loading } = useStorageState();

  if(loading) return <View style={{ flex: 1, backgroundColor: '#fff' }}></View>

  if (token) {
    return <Redirect href="/(tabs)" />;
  }
  return <SignUpPage/>
}
