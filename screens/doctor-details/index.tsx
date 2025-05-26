import { FC, useEffect, useState } from "react";
import * as Linking from 'expo-linking';

import { doctorDetailsSyles as styles} from "./doctor-details.styles"
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {  router, useLocalSearchParams } from "expo-router";
import { Stars } from "@/components/stars";
import Animated, { FadeIn, FadeInDown, FadeInLeft, FadeInRight, BounceInDown, useAnimatedStyle, withSpring, useSharedValue} from "react-native-reanimated";
import StarRating from "./reting";
import { CustomModal } from "@/components/modal";
import { API } from "@/services/api";
import { apiEndpoints } from "@/constants/api-endpoints";

const links = {
  linkedin: 'https://www.linkedin.com',
  instagram: 'https://www.instagram.com',
  whatsapp: 'https://api.whatsapp.com/send?phone=+244999999999',
  twitter: 'https://www.x.com'
}

const sendUserToExternalLink = (url: string) => {
  Linking.openURL(url)
}

const parseSocials = (socials: string): string[] => {
  return socials.split(',').map(item => item.trim());
};

const DOCTOR = require('@/assets/images/african-american-black-doctor-man-with-stethoscope-isolated-white-background 1.png')

const goToChat = (parentName: string, parentID: string) => {
  router.push({
    pathname: "/chat",
    params: {
      parentID,
      parentName,
    }
  });
}

const DoctorDetails: FC = () => {
  const goBack = () => {
    router.back()
  }

  const {
    id,
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

  const [showModal, setShowModal] = useState(false)

  const [rading, setRating] = useState<null | number>(null)
  const [value, setValue] = useState(0)
  const [facebook, setFacebook] = useState("")
  const [number, setNumber] = useState("")


  const [loading, setLoading] = useState(false)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    }
  })

  const rating = async () => {
    const { data, statusCode } = await API.patch(`/users/${id}`, { rating: value}, setLoading)

    if(statusCode === 200) {
      setRating(data?.rating)
      //setValue()
      setShowModal(false)
    }
  }

    const getUser = async (isLoading?: (lading: boolean) => void) => {
      const { data } = await API.get(`${apiEndpoints.me}/${id}`, {}, isLoading)


      if(data.id) {
         setFacebook(parseSocials(data?.socials)[0])
      setNumber(parseSocials(data?.socials)[1])
      }
      console.log("Data:",data)
    }

    useEffect(() => {
      getUser()
    }, [])


  useEffect(() => {
    setRating(null)
  }, [])

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
          source={{ uri: avatar as any}}
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

        <TouchableOpacity onPress={() => setShowModal(true)}>

          <Stars stars={rading || star as any}/>
        </TouchableOpacity>


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
        {/* <AntDesign name="instagram" size={24} color="#2E4A66" onPress={() => sendUserToExternalLink(links.instagram)}/>
        <AntDesign name="linkedin-square" size={24} color="#2E4A66" onPress={() => sendUserToExternalLink(links.linkedin)}/> */}
        {facebook && <AntDesign name="facebook-square" size={24} color="#2E4A66" onPress={() => sendUserToExternalLink(facebook)}/>}
       {number &&  <FontAwesome name="whatsapp" size={24} color="#2E4A66" onPress={() => sendUserToExternalLink(`https://api.whatsapp.com/send?phone=+244${number}`)}/>}
        </Animated.View>

        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => goToChat(name?.toString() || "", id?.toString() || "")}>
          <Text style={styles.sendMessage}>Enviar mensagem</Text>
        </TouchableOpacity>

      </Animated.View>

      <CustomModal
        isVisible={showModal}
        title="Avaliação"
        onClose={() => setShowModal(false)}
      >
        <View>
          <StarRating
            initialRating={Number(rading || star || 0)}
            onRatingChange={setValue}
          />

          <TouchableOpacity style={styles.button} onPress={rating}>
           {loading?
           <ActivityIndicator  color={"#fff"} size="small"/>
           : <Text style={styles.buttonText}>Avaliar</Text>}
          </TouchableOpacity>
        </View>
      </CustomModal>
    </View>
  )
}

export default DoctorDetails
