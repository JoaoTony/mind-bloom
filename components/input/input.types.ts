import { TextInputProps } from "react-native"

export type InputProps = {} & TextInputProps

export type InputSelectProps = {
  data: { label: string, value: string }[]
} & InputProps
