import {FC} from "react"
import {homeBannerSyles as styles} from "./banner.styles"
import { Image, Text, View } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';


const Doctor = require("@/assets/images/doctor.png")

export const HomeBanner: FC = () => {
  return(
    <LinearGradient
     colors={["#3b4bc0", "#613bc0"]}
      start={{x: 0, y: 0}} end={{x: 1, y: 0}}
      style={styles.container}
    >

    {/* <View style={styles.container}> */}
      <Text style={styles.text}>
      Bem-vindo ao MindBloom, o seu aplicativo para identificação de TEA e TDAH em crianças.
      Esperamos lhe ser útil no que precisar e, desejamos oferecer um serviço de qualidade
      </Text>
      <Image
        style={styles.image}
        source={Doctor}
        />
    {/* </View> */}
  </LinearGradient>
  )
}
