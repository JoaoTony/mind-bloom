import {FC} from "react"
import {homeBannerSyles as styles} from "./banner.styles"
import { Image, Text, View } from "react-native"

const Doctor = require("@/assets/images/doctor.png")

export const HomeBanner: FC = () => {
  return(
    <View style={styles.container}>
      <Text style={styles.text}>
      Bem-vindo ao MindBloom, o seu aplicativo para identificação de TEA e TDAH em crianças.
      Esperamos lhe ser útil no que precisar e, desejamos oferecer um serviço de qualidade
      </Text>
      <Image
        style={styles.image}
        source={Doctor}
      />
    </View>
  )
}
