import { FC } from "react";

import { doctorDetailsSyles as styles} from "./doctor-details.styles"
import { Image, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import {  router } from "expo-router";
import { Stars } from "@/components/stars";

const DOCTOR = require('@/assets/images/african-american-black-doctor-man-with-stethoscope-isolated-white-background 1.png')

const DoctorDetails: FC = () => {
  const goBack = () => {
    router.back()
  }

  return(
    <View
      style={styles.container}
    >
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={24} color="black"
          onPress={goBack}
        />
      </View>

      <View style={styles.imageWrapper}>
        <Image
          source={DOCTOR}
          style={styles.image}
        />
      </View>

      <View
        style={styles.content}
      >
        <Text style={styles.name}>
          Gregor MacGregor
        </Text>
        <Text style={styles.occupation}>
          Militar e aventureiro (Charlatão)
        </Text>

        <Stars stars={4.7}/>

        <View style={styles.tabSeparator} />

        <Text style={styles.description}>
          Gregor MacGregor foi um militar, aventureiro e vigarista escocês. Lutou na Guerra de independência da Venezuela, ficou conhecido como ladrão e impostor, por se declarar "Príncipe de Poyais", um país fictício usado para atrair investidores e até mesmo colonos.
        </Text>

        <View style={styles.social}>
        <AntDesign name="instagram" size={24} color="#2E4A66" />
        <AntDesign name="linkedin-square" size={24} color="#2E4A66" />
        <AntDesign name="twitter" size={24} color="#2E4A66" />
        </View>

      </View>
    </View>
  )
}

export default DoctorDetails
