import { FC } from "react";

import { chatListCardStyles as styles } from "./chat-list-card.styles"
import { Image, View, Text, TouchableOpacity } from "react-native";
import { Stars } from "../stars";
import { router } from "expo-router";

const DOCTOR = require('@/assets/images/doctor-1.png')

type Props = {
  id: number,
  name: string,
  avatar: string
  message: string,
  date: any,
  onPress?: (id: string) => void,
}

export const ChatListCard: FC<Props> = ({ name, avatar,id, date, message}) => {
  const goToDetails = () => {
    router.push({
      pathname: "/chat",
      params: {
        parentID: id,
        parentName: name
      }
    });
  }

  return(
    <TouchableOpacity
      style={styles.container}
      onPress={goToDetails}
    >

        <View style={styles.imgWapper}>
          <Image
            source={avatar}
            style={styles.imag}
            />
        </View>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={styles.name}>{name} </Text>
          <Text style={styles.message} numberOfLines={1}>
            {message}
          </Text>
          <Text  style={styles.date}>{date}</Text>

        </View>



    </TouchableOpacity>
  )
}
