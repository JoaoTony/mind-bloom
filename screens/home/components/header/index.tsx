import { FC } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { homeHeaderSyles as styles } from "./header.styles";
import Ionicons from '@expo/vector-icons/Ionicons';

const AVATAR = require("@/assets/images/avatar.png")

export const HomeHeader: FC = () => {
  return(
    <View
      style={styles.container}
    >
      <View style={styles.avatarWrapper}>
        <Image
          source={AVATAR}
          width={50}
          height={50}
          style={styles.avatar}
        />

        <View>
          <Text style={styles.text}>
            Olá,
          </Text>
          <Text style={styles.textBolder}>
            Gracieth tony
          </Text>
        </View>
      </View>

      <TouchableOpacity>
        <Ionicons name="notifications" size={26} color="black" />
      </TouchableOpacity>
    </View>
  )
}
