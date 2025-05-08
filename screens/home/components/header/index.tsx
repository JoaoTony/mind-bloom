import { FC, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { homeHeaderSyles as styles } from "./header.styles";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useStorageState } from "@/constants/async-storage";
import { apiEndpoints } from "@/constants/api-endpoints";
import { API } from "@/services/api";
import { AntDesign } from "@expo/vector-icons";

const AVATAR = require("@/assets/images/avatar.png")

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

      {/* <TouchableOpacity>
        <Ionicons name="notifications" size={26} color="black" />
      </TouchableOpacity> */}
    </View>
  )
}
