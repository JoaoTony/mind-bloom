import {FC} from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { styles } from './styles'

const Brain = require('@/assets/images/brain.png')
const BG = require('@/assets/images/kid-doing-occupational-therapy-session.png')

import { SignUpForm } from "./form"
import { router } from "expo-router"

const SignUp: FC = () => {
  const goToLogin = () => {
    router.replace('/login');
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
        Cadastrar-se
      </Text>

      <Image
        source={BG}
        style={styles.BG}
      />

      <SignUpForm/>

      <TouchableOpacity
        style={styles.whiteButton}
        onPress={goToLogin}
      >
        <Text style={styles.greyText}>Já possui uma conta? Logar</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignUp
