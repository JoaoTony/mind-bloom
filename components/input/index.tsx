import { FC } from "react";
import { TextInput } from "react-native";
import { inputStyles } from "./input.styles";
import { InputProps } from "./input.types";

export const Input: FC<InputProps> = props => {
  return(
    <TextInput
      {...props}
      style={inputStyles.input}
      placeholderTextColor="#717F7F"
    />
  )
}
