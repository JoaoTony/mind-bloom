import {FC} from "react"
import { Text, View } from "react-native"

const User: FC = () => {
  return(
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
         alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text>USER</Text>
    </View>
  )
}

export default User
