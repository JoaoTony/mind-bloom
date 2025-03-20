import { FC } from "react";

import { homeCategoriesStyles as styles } from "./categories.styles"
import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";


export const HomeCategories: FC = () => {
  const learnMore = (type: 'TEA' | 'TDAH') => {
    router.push({pathname: '/learn-more',
      params: { type }
    })
  }
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      <View style={styles.content}>
        <TouchableOpacity style={styles.card} onPress={() => learnMore('TEA')}>
          <Text style={styles.text}>TEA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, { backgroundColor: '#a5b7ec' }]} onPress={() => learnMore('TDAH')}>
          <Text style={styles.text}>TDAH</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
