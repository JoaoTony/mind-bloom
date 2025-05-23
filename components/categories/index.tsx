import { FC } from "react";

import { homeCategoriesStyles as styles } from "./categories.styles"
import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

type Type = 'TEA' | 'TDAH'

export const Categories: FC<{ selected?: string, onSelect?: (type: Type) => void }> = ({ onSelect, selected }) => {
  const learnMore = (type: Type) => {
    if(onSelect && typeof onSelect === "function") {
      onSelect(type)

      return
    }

    router.push({pathname: '/learn-more',
      params: { type }
    })
  }

  const border = (_type: string) =>  selected === _type  ? { borderWidth: 2, borderColor: '#144467' } : { borderWidth: 2, borderColor: 'transparent' }

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      <View style={styles.content}>
        <TouchableOpacity style={[styles.card, border("TEA")]} onPress={() => learnMore('TEA')}>
          <Text style={styles.text}>TEA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, border("TDAH"), { backgroundColor: '#3b4bc0' }]} onPress={() => learnMore('TDAH')}>
          <Text style={styles.text}>TDAH</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
