import { FC } from "react"
import { View, Text, Image } from "react-native"

import IMAGE from "@/assets/images/empty.gif"

export const Empty: FC = () => {
  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={IMAGE} width={60} height={60} style={{ width: 100, height: 100 }} />
      <Text>Lista Vazia</Text>
    </View>
  )
}
