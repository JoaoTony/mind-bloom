import { FC } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { homeSearchSyles as styles } from "./search.styles";

export const HomeSearch: FC = () => {
  return(
    <View style={styles.container}>
      <TextInput
        placeholder="Pesquisar"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button}>
        <FontAwesome name="search" size={24} color="#404040" />
      </TouchableOpacity>
    </View>
  )
}
