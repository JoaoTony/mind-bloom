import { FC, useEffect, useState } from "react";

import { learnMoreStyles as styles} from "./learn-more.styles"
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import {  router, useGlobalSearchParams, useRootNavigationState, useLocalSearchParams } from "expo-router";
import { Stars } from "@/components/stars";
import { data } from "./data";
import Animated, { Easing, useAnimatedStyle, useDerivedValue, useSharedValue, withRepeat, withSpring, withTiming } from "react-native-reanimated";
import { ShakingText } from "@/components/shacking-text";


const TEA = require('@/assets/images/tea.png')
const TDAH = require('@/assets/images/tdah.png')

const LearnMore: FC = () => {
  const [index, setIndex] = useState(0)
  const goBack = () => {
    router.back()
  }
  const { type } = useLocalSearchParams() as { type: 'TEA' | 'TDAH' }

  const chooseData = data[type]

  const cantPrev = index <= 0
  const cantNext = index + 1 >= chooseData.texts.length

  const handlePrev = () => {
    if(cantPrev) return

    setIndex(prev => prev - 1)
  }

  const handleNext = () => {
    if(cantNext) return
    setIndex(prev => prev + 1)
  }

    const scale = useSharedValue(1)

      useEffect(() => {
      scale.value = withRepeat(
        withTiming(1.1, {
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
        }),
        -1, // -1 = infinito
        true // reverse = sim
      )
    }, [])

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }]
    }))

      const translateY = useSharedValue(50)


      useEffect(() => {
        translateY.value = withSpring(0, {
          damping: 10,
          stiffness: 150,
        })
      }, [])

      const animatedStyleBounce = useAnimatedStyle(() => {
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
          size={24}
          color="black"
          onPress={goBack}
        />

        <Text style={styles.headerTitle}>{type || ''}</Text>
      </View>


     <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 80,
          paddingBottom: 50
        }}
      >



        <Animated.Image
          style={[styles.image, animatedStyle]}
          source={type === 'TEA' ? TEA : TDAH}
        />
       {index === 0 &&
       (
          <Animated.Text style={[styles.whatIs, animatedStyleBounce]}>O que é o {' '}
            <Text style={[
              styles.whatIsHighlighted,
              type === 'TDAH' && { color: '#a5b7ec' }
              ]}>
              {type || ''}?
            </Text>
          </Animated.Text>
        )}

        {/* <Animated.Text style={[styles.text, animatedStyleBounce]}> */}
          <ShakingText
            style={{...styles.text, ...animatedStyleBounce}}
            text={chooseData.texts[index]}
          />
        {/* </Animated.Text> */}
      </ScrollView>

      <View style={styles.footer}>
        {!cantPrev ? (
          <TouchableOpacity style={styles.butttonPrev} onPress={handlePrev}>
            <Text style={styles.buttonPrevText}>Voltar</Text>
          </TouchableOpacity>
        ) : (
          <View/>
        )}
        {!cantNext  && (
          <TouchableOpacity style={styles.butttonNext} onPress={handleNext}>
            <Text style={styles.butttonNextText}>Avançar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default LearnMore
