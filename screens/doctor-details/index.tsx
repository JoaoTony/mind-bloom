import { FC, useEffect } from "react";
import * as Linking from 'expo-linking';

import { doctorDetailsSyles as styles} from "./doctor-details.styles"
import { Image, StyleSheet, Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {  router, useLocalSearchParams } from "expo-router";
import { Stars } from "@/components/stars";
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeInRight, BounceInDown, useAnimatedStyle, withSpring, useSharedValue} from "react-native-reanimated";

const links = {
  linkedin: 'https://www.linkedin.com',
  instagram: 'https://www.instagram.com',
  whatsapp: 'https://api.whatsapp.com/send?phone=+244999999999',
  twitter: 'https://www.x.com'
}

const sendUserToExternalLink = (url: string) => {
  Linking.openURL(url)
}

const DOCTOR = require('@/assets/images/african-american-black-doctor-man-with-stethoscope-isolated-white-background 1.png')

const DoctorDetails: FC = () => {
  const goBack = () => {
    router.back()
  }

  const {
    name,
    avatar,
    occupation,
    star,
    description
  } = useLocalSearchParams()

  const translateY = useSharedValue(50)

  useEffect(() => {
    translateY.value = withSpring(0, {
      damping: 10,
      stiffness: 150,
    })
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    }
  })

  return(
    <View
      style={styles.container}
    >
      <View style={[
        styles.header,
        StyleSheet.absoluteFill
        ]}>
        <Ionicons
          name="chevron-back"
          size={24} color="black"
          onPress={goBack}
        />
      </View>

      <View style={styles.imageWrapper}>
        <Animated.Image
          //sharedTransitionTag="sharedTag"
          //sharedTransitionStyle={{ }}
          source={avatar as any}
          style={styles.image}
          entering={FadeInRight.duration(400).delay(200)}
        />
      </View>

      <Animated.View
        //style={styles.content}
        style={[styles.content, animatedStyle]}
        entering={BounceInDown.duration(400).delay(100)}
      >
        <Animated.Text
          entering={FadeInLeft.duration(1000).delay(200)}
          style={styles.name}
        >
          {name || ""}
        </Animated.Text>
        <Animated.Text
          style={styles.occupation}
          entering={FadeInLeft.duration(400).delay(300)}
        >

          {occupation || ""}
        </Animated.Text>

        <Animated.View
          entering={FadeInLeft.duration(400).delay(400)}
        >

          <Stars stars={star as any}/>
        </Animated.View>

        <View style={styles.tabSeparator} />

        <Animated.Text
          style={styles.description}
          entering={FadeInLeft.duration(400).delay(500)}
        >
          {description || ""}
        </Animated.Text>

        <Animated.View
          style={styles.social}
          entering={FadeInDown.duration(400).delay(600)}
        >
        <AntDesign name="instagram" size={24} color="#2E4A66" onPress={() => sendUserToExternalLink(links.instagram)}/>
        <AntDesign name="linkedin-square" size={24} color="#2E4A66" onPress={() => sendUserToExternalLink(links.linkedin)}/>
        <AntDesign name="twitter" size={24} color="#2E4A66" onPress={() => sendUserToExternalLink(links.twitter)}/>
        <FontAwesome name="whatsapp" size={24} color="#2E4A66" onPress={() => sendUserToExternalLink(links.whatsapp)}/>
        </Animated.View>

      </Animated.View>
    </View>
  )
}

export default DoctorDetails
