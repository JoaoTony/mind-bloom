import { FC, useState } from "react";

import { learnMoreStyles as styles} from "./learn-more.styles"
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import {  router, useGlobalSearchParams, useRootNavigationState, useLocalSearchParams } from "expo-router";
import { Stars } from "@/components/stars";
import { data } from "./data";

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

        <Image
          style={styles.image}
          source={type === 'TEA' ? TEA : TDAH}
        />
       {index === 0 &&
       (
          <Text style={styles.whatIs}>O que é o {' '}
            <Text style={[
              styles.whatIsHighlighted,
              type === 'TDAH' && { color: '#a5b7ec' }
              ]}>
              {type || ''}?
            </Text>
          </Text>
        )}

        <Text style={styles.text}>{chooseData.texts[index]}</Text>
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
