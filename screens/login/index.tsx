import {FC} from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { styles } from './styles'

const Brain = require('@/assets/images/brain.png')
const BG = require('@/assets/images/kid-doing-occupational-therapy-session.png')

import { LoginForm } from "./form"
import { router } from 'expo-router';

const Login: FC = () => {
  const goToSignUp = () => {
    router.replace('/sign-up');
  }

  return(
    <View style={styles.container}>
      <Image
        source={Brain}
        style={styles.brain}
      />
      <Text
        style={styles.whiteText}
      >
       Iniciar sessão
      </Text>

      <Image
        source={BG}
        style={styles.BG}
      />

      <LoginForm/>

      <TouchableOpacity
        style={styles.whiteButton}
        onPress={goToSignUp}
      >
        <Text style={styles.greyText}>Não possui uma conta? Cadastrar</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login
