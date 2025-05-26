import { FC } from "react";

import { testStyles as styles } from "../test.styles"
import { Text, TouchableOpacity, View } from "react-native";
import { testDataSectionDescription } from "../data";
import { ShakingText } from "@/components/shacking-text";

export const NewTestSection: FC<{ section: "A" | "B" | "C", type:  'TEA' | 'TDAH' }> = ({ section = "A", type = "TDAH" }) => {
  return(
    <View style={styles.newTestSection}>
      <ShakingText
        style={styles.sectionTitle}
        text={`Secção ${section || ""}`}
      />

       <ShakingText
          style={styles.sectionText}
          text={testDataSectionDescription[type][section]}
        />
    </View>
  )
}
