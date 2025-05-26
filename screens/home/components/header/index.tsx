import { FC, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { homeHeaderSyles as styles } from "./header.styles";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useStorageState } from "@/constants/async-storage";
import { apiEndpoints } from "@/constants/api-endpoints";
import { API } from "@/services/api";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const AVATAR = require("@/assets/images/avatar.png")

const goToChat = () => {
  router.push({
    pathname: '/parent-chat-list',
    params: {
      type: 'Parent'
    }
  })
}

export const HomeHeader: FC = () => {
  const [name, setName] = useState("")
  const { token: id } = useStorageState(true)

   const getUser = async () => {
    const { data } = await API.get(`${apiEndpoints.me}/${id}`)

    if(data?.id) {
      setName(data?.name || "")
    }

    console.log("Data:",data)
  }

  useEffect(() => {
    if(id) {
      getUser()
    }
  }, [id])

  return(
    <View
      style={styles.container}
    >
      <View style={styles.avatarWrapper}>
        {/* <Image
          source={AVATAR}
          width={50}
          height={50}
          style={styles.avatar}
        /> */}
          <View style={styles.avatarCircle}>
            <AntDesign name="user" size={24} color="black" />
          </View>

        <View>
          <Text style={styles.text}>
            Olá,
          </Text>
          <Text style={styles.textBolder}>
            {name || ""}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={goToChat}>
        <Ionicons name="chatbubble" size={26} color="#3b4bc0" />
        {/* <Ionicons name={isFocused ? "chatbubble" : "chatbubble-outline"}  color={isFocused ? selectedColor : '#fff'}  size={20} style={{ marginRight: 3 }} /> */}
      </TouchableOpacity>
    </View>
  )
}
