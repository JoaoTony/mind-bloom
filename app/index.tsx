import LoginPage from "@/screens/login";
import { Text, View } from "react-native";

export default function Login() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
     <LoginPage/>
    </View>
  );
}
