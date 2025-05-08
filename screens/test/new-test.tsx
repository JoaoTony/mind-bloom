import { FC, useCallback, useEffect, useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"

import Ionicons from '@expo/vector-icons/Ionicons';

import { testStyles as styles } from "./test.styles"
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { NewTestSection } from "./new-test-steps/section";
import { testData } from "./data";
import { CustomModal } from "@/components/modal";
import { ConfirmModal } from "./confirm-modal";
import { useStorageState } from "@/constants/async-storage";

const TEA = require('@/assets/images/tea.png')
const TDAH = require('@/assets/images/tdah.png')

const goBack = () => {
  router.back()
}

const calcPercent = (length: number, quantity: number) => {
  return (quantity / length) * 100
}

const NewTest: FC = () => {
  const { testType, childID, childName } = useLocalSearchParams() as { testType: 'TEA' | 'TDAH', childID: string, childName: string }
  const [index, setIndex] = useState(0)
  const [data, setData] = useState(testData[testType])
  const [showModal, setShowModal] = useState(false)
  const [percentage, setPercentage]= useState(0)

  const { token: id } = useStorageState(true)

  const chooseData = testData[testType]

  const cantPrev = index <= 0
  const cantNext = index + 1 >= chooseData.length

  const selected = testData[testType][index]

  const choosedecision = (yesOrNot: boolean) => {
    setData(prev => {
      let list = prev

      prev[index] = {
        ...selected,
        yesOrNot
      }

      return list
    })
  }

  const handlePrev = () => {
    if(cantPrev) return

    if(showModal) {
      setShowModal(false)
    }

    setIndex(prev => prev - 1)
  }

  const handleNext = (yesOrNot: boolean) => {
    if(cantNext) return
    setIndex(prev => prev + 1)
    choosedecision(yesOrNot)
  }

  useEffect(() => {
    if(index + 1 === chooseData.length) {
      setShowModal(true)

      const length = chooseData.length

      const quantity = data.filter(item => item.yesOrNot)?.length

      console.log(length, quantity)

      setPercentage(Math.ceil(calcPercent(length, quantity)))
    }
  }, [data, index])

  useFocusEffect(
    useCallback(() => {
      setData(testData[testType])
      setPercentage(0)
    }, [])
  );

  return(
    <View style={styles.newTestContainer}>
     <View style={styles.newTextHeader}>
        <Ionicons
          name="chevron-back"
          size={24} color="black"
          onPress={goBack}
        />

        <Text style={[styles.title, { marginBottom: 0, marginLeft: 6 }]}>Teste de {testType || ""}</Text>
      </View>

      <NewTestSection
        section={selected.section as any}
        type={testType}
      />

      <View style={styles.contentWrapper}>

        <Image
          style={styles.illustration}
          source={testType === 'TEA' ? TEA : TDAH}
        />
        <View style={styles.content}>
          <Text style={styles.quation}>
            {selected.text}
          </Text>


          <View style={styles.footer}>
            {!cantPrev ? (
              <TouchableOpacity style={styles.butttonPrev} onPress={handlePrev}>
                <Text style={styles.buttonPrevText}>Voltar</Text>
              </TouchableOpacity>
            ) : (
              <View/>
            )}

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity style={styles.noButton} onPress={() => handleNext(false)}>
                <Text style={styles.noButtonText}>Não</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.butttonNext} onPress={() => handleNext(true)}>
                <Text style={styles.butttonNextText}>Sim</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </View>

      <CustomModal
        isVisible={showModal}
        title="Diagnóstico"
        onClose={() => setShowModal(false)}
      >
        <ConfirmModal
          percentage={percentage}
          childName={childName || ""}
          onClose={() => setShowModal(false)}
          id={id || ""}
          childID={childID}
          testType={testType}
        />
      </CustomModal>
    </View>
  )
}

export default NewTest
