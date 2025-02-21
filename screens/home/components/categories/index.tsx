import { FC } from "react";

import { homeCategoriesStyles as styles } from "./categories.styles"
import { Text, View } from "react-native";


export const HomeCategories: FC = () => {
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.text}>TEA</Text>
        </View>
        <View style={[styles.card, { backgroundColor: '#a5b7ec' }]}>
          <Text style={styles.text}>TDAH</Text>
        </View>
      </View>
    </View>
  )
}
