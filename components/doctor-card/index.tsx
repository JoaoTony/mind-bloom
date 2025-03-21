import { FC } from "react";

import { doctorCardSyles as styles } from "./doctor-card.styles"
import { Image, View, Text, TouchableOpacity } from "react-native";
import { Stars } from "../stars";
import { DoctorCardProps } from "./doctor-card.types";
import { router } from "expo-router";

const DOCTOR = require('@/assets/images/doctor-1.png')

export const DoctorCard: FC<DoctorCardProps> = ({ name, occupation, star}) => {
  const goToDetails = () => {
    router.push('/doctor-details');
  }

  return(
    <TouchableOpacity
      style={styles.container}
      onPress={goToDetails}
    >
      <View style={styles.imgWapper}>
        <Image
          source={DOCTOR}
          style={styles.imag}
        />
      </View>

      <View>
        <Text style={styles.name}>{name}</Text>
        <Text  style={styles.occupation}>{occupation}</Text>
        <Stars stars={star}/>
      </View>
    </TouchableOpacity>
  )
}
