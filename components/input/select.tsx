import { FC, useEffect, useState } from "react";

import { inputStyles as styles } from "./input.styles"
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { InputSelectProps } from "./input.types";

//import DOWN from "@/assets/images/icons/chevron-down.png"
import  { AntDesign } from "@expo/vector-icons"

export const InputSelect: FC<InputSelectProps> = ({ secureTextEntry, data, onChangeText, editable = true, value, ...rest }) => {
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState("")

  const onSelectItem = (item: { value: string, label: string }) => {
    setShow(false)
    setSelected(item.label)
    onChangeText && onChangeText(item.value)
  }

  useEffect(() => {
    const getValue = data?.find(item => item.value === value)

    if(getValue) {
      setSelected(getValue.label)
    }
  }, [value, data])

  const customStyle = rest.style as any

  return(
    <View
      style={[styles.containert, customStyle, { position: 'relative' }]}
    >
      <>
      <TouchableOpacity
        style={[styles.inputWapper, customStyle]}
        onPress={() => setShow(prev => !prev)}
        activeOpacity={1}
        disabled={!editable}
      >
        <View
          style={[styles.inputSelect, customStyle]}
        >
          <Text
            style={styles.selectText}
          >
            {selected || rest?.placeholder || ""}
          </Text>
        </View>

        {/* <Image
          style={styles.icon}
          source={DOWN}
        /> */}
        <AntDesign
          name="down"
          style={styles.icon}
        />
      </TouchableOpacity>

      {show &&
        <View style={styles.dropdown}>
          <ScrollView  style={{ maxHeight: 100 }}>
            {data?.map(item => (
              <TouchableOpacity
                key={item.value}
                onPress={() => onSelectItem(item)}
              >
              <Text style={styles.dropdownItem}>{item.label}</Text>
            </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      }
      </>
    </View>
  )
}
