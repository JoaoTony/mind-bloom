import { FC, useState } from "react";
import { TextInput } from "react-native";
import { inputStyles } from "./input.styles";
import { InputProps } from "./input.types";

import {Picker} from '@react-native-picker/picker';

export const InputSelect: FC<InputProps> = props => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  return(
    // <TextInput
    //   {...props}
    //   style={inputStyles.input}
    //   placeholderTextColor="#717F7F"
    // />

    <Picker
    style={inputStyles.input}
  selectedValue={selectedLanguage}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedLanguage(itemValue)
  }>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker>
  )
}
