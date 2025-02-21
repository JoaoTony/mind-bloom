import { Input } from "@/components/input";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import {router} from "expo-router"

export const LoginForm: FC = () => {
  const signIn = () => {
      router.replace('/(tabs)');
    }
  return(
    <View style={styles.form}>
      <Input
        placeholder="E-mail"
      />
      <Input
        placeholder="Senha"
      />

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.95}
        onPress={signIn}
      >
        <Text style={styles.whiteText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  )
}
