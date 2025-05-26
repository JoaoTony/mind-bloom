import { Input } from "@/components/input";
import { FC, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import {router} from "expo-router"
import { useSession } from "@/context/auth-contex";
import { apiEndpoints } from "@/constants/api-endpoints";
import { API } from "@/services/api";
import { useStorageState } from "@/hooks/useStorageState";
import { USER_ACCESS_TOKEN } from "@/constants";
import { asyncSetToken, asyncSetUserID, asyncSetUserRole } from "@/constants/async-storage";

export const signInErrorMessage = (statusCode: number) => {
  switch (statusCode) {
    case 401:
      return "Email ou palavra-passe incorretos";

    default:
      return "Alguma coisa correu mal, por favor, tente novamente mais tarde";
  }
}

export const LoginForm: FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const onSignIn = async () => {
     const { statusCode, data } = await API.post<any>(apiEndpoints.signIn, { email, password }, setLoading)

    if(data?.token?.token) {
      await asyncSetToken(data?.token?.token);
      await asyncSetUserID(data?.token?.id || "")
      await asyncSetUserRole(data?.token?.role || "Psychologist")

      router.replace("/(tabs)")
    }

    if(statusCode > 200) {
      setError(signInErrorMessage(statusCode))

    }

  }

  return(
    <View style={styles.form}>
      <Input
        placeholder="E-mail"
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Input
        placeholder="Senha"
        onChangeText={setPassword}
        secureTextEntry
      />
       {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}


      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.95}
        onPress={onSignIn}
        disabled={!email || !password}
      >
        {loading ? (
          <ActivityIndicator size="small" color={"#fff"}/>
        ) : (<Text style={styles.whiteText}>Entrar</Text>)}
      </TouchableOpacity>
    </View>
  )
}
