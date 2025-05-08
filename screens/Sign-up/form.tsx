import { Input } from "@/components/input";
import { FC, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { InputSelect } from "@/components/input/select";
import { apiEndpoints } from "@/constants/api-endpoints";
import { asyncSetToken } from "@/constants/async-storage";
import { API } from "@/services/api";
import { router } from "expo-router";

export const signUpErrorMessage = (statusCode: number) => {
  switch (statusCode) {
    case 400:
      return "Alguma coisa correu mal, verifica se os campos foram inseridos corretamente";
    case 700:
      return "As senhas precisam ser iguais"

    default:
      return "Alguma coisa correu mal, por favor, tente novamente mais tarde";
  }
}

export const SignUpForm: FC = () => {

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const signUp = async () => {
    if(password !== confirmPassword) {
      setError(signUpErrorMessage(700))
      return
    }
     const { statusCode, data } = await API.post<any>(apiEndpoints.signUp, {
      email,
      password,
      role: 'Parent',
      name

    }, setLoading)

    console.log("SSS:", data, statusCode)

    if(statusCode === 201) {
      await asyncSetToken(data.token);

      router.replace("/login")
    }

    if(statusCode > 300) {
      setError(signUpErrorMessage(statusCode))

    }

  }
  return(
    <View style={styles.form}>
      <Input
        placeholder="E-mail"
        onChangeText={text => {
          setEmail(text)
          setError("")
        }}
      />
      <Input
        placeholder="Nome"
        onChangeText={text => {
          setName(text)
          setError("")
        }}
      />
      <Input
        placeholder="Senha"
        secureTextEntry
        onChangeText={text => {
          setPassword(text)
          setError("")
        }}
      />
      <Input
        placeholder="Confirmar Senha"
        secureTextEntry
        onChangeText={text => {
          setconfirmPassword(text)
          setError("")
        }}
      />

      {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.95}
        onPress={signUp}
        disabled={!email || !password || !name}
      >
        {loading ? (
          <ActivityIndicator size="small" color={"#fff"}/>
        ) : (<Text style={styles.whiteText}>Cadastrar</Text>)}
      </TouchableOpacity>
    </View>
  )
}
