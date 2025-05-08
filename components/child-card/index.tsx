import { FC } from "react";

import { childCardStyles as styles } from "./child-card.styles"
import { Image, View, Text, TouchableOpacity } from "react-native";
import { Stars } from "../stars";
import { router } from "expo-router";

const DOCTOR = require('@/assets/images/doctor-1.png')

type Props = {
  id: number,
  name: string,
  adhdDiagnosisPercentage: number,
  asdDiagnosisPercertage:  number,
  avatar: string
  disabled?: boolean,
  testType: 'TEA' | 'TDAH'
  onPress?: (id: string) => void
}

export const ChildCard: FC<Props> = ({ name, asdDiagnosisPercertage, adhdDiagnosisPercentage, avatar, disabled, id, testType, onPress}) => {
  const goToDetails = () => {
    if(onPress && typeof onPress === "function") {
      onPress?.(id as any)
      return
    }
    router.push({
      pathname: "/new-test",
      params: {
        childID: id,
        testType,
        childName: name
      }
    });
  }

  return(
    <TouchableOpacity
      style={styles.container}
      onPress={goToDetails}
      disabled={disabled}
    >
      <View style={styles.imgWapper}>
        <Image
          source={avatar}
          style={styles.imag}
        />
      </View>

      <View>
        <Text style={styles.name}>{name}</Text>
        <Text  style={styles.occupation}>TDAH: {adhdDiagnosisPercentage || 0}%</Text>
        <Text  style={styles.occupation}>TEA: {asdDiagnosisPercertage || 0}%</Text>
      </View>
    </TouchableOpacity>
  )
}
