import { FC } from "react";

import { testStyles as styles } from "../test.styles"
import { Text, TouchableOpacity, View } from "react-native";
import { testDataSectionDescription } from "../data";

export const NewTestSection: FC<{ section: "A" | "B" | "C", type:  'TEA' | 'TDAH' }> = ({ section = "A", type = "TDAH" }) => {
  return(
    <View style={styles.newTestSection}>
      <Text style={styles.sectionTitle}>Secção {section || ""}</Text>

      <Text style={styles.sectionText}>{testDataSectionDescription[type][section]}</Text>
    </View>
  )
}
