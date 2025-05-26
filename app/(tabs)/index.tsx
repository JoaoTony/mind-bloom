import { useRole } from "@/constants/async-storage"
import ChatListScreen from "@/screens/chst-list"
import HomeScreen from "@/screens/home"
import {FC} from "react"
import { Text, View } from "react-native"

const Home: FC = () => {
  const { loading, role } = useRole()

  if(loading) return <View></View>

  return(
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
      }}
    >
      {role === "Parent" ? <HomeScreen/> : <ChatListScreen />}
    </View>
  )
}

export default Home
