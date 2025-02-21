import { Input } from "@/components/input";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { InputSelect } from "@/components/input/select";

export const SignUpForm: FC = () => {
  return(
    <View style={styles.form}>
      <Input
        placeholder="E-mail"
      />
      <Input
        placeholder="Nome"
      />
      <Input
        placeholder="Nome da criança"
      />
      {/* <InputSelect
        placeholder="Nome da criança"
      /> */}
      <Input
        placeholder="Senha"
      />

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.95}
      >
        <Text style={styles.whiteText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  )
}
