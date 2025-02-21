import HomeScreen from "@/screens/home"
import {FC} from "react"
import { Text, View } from "react-native"

const Home: FC = () => {
  return(
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
      }}
    >
      <HomeScreen/>
    </View>
  )
}

export default Home
