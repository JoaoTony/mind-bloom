import { type FC } from 'react'
import { View } from 'react-native'

import {AntDesign, Octicons, MaterialCommunityIcons, Ionicons} from "@expo/vector-icons"
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { defualtTheme } from '@/styles/theme'



interface CustomBottomTabIconProps {
  route: string
  isFocused: boolean
}

const selectedColor = defualtTheme.colors.green.dark

export const menuList = [
  { name: 'index', label: 'Home' },
  { name: 'exam', label: 'Exames' },
  { name: 'children', label: 'Crianças' },
  { name: 'user', label: 'Perfil' }
]

export const menuListForDoctor = [
  { name: 'chat-list', label: 'Chats' },
  { name: 'children', label: 'Crianças' },
  { name: 'user', label: 'Perfil' }
]

const width = 20
const height = 20

const renderIcon = (route: string, isFocused: boolean) => {
  switch (route) {
    case 'index':
      return   <MaterialCommunityIcons name={isFocused ? 'home' : 'home-outline'} color={isFocused ? selectedColor : '#fff'}  size={24} />
    case 'exam':
      return  <MaterialCommunityIcons name={isFocused ? 'file-document-edit' : 'file-document-edit-outline'} color={isFocused ? selectedColor : '#fff'} size={24} />
    case 'children':
      return <FontAwesome6 name="children"  color={isFocused ? selectedColor : '#fff'}  size={24} />
    case 'chat-list':
      return <Ionicons name={isFocused ? "chatbubble" : "chatbubble-outline"}  color={isFocused ? selectedColor : '#fff'}  size={20} style={{ marginRight: 3 }} />
    case 'user':
      return  <Octicons name={isFocused ? 'person-fill' : 'person'} color={isFocused ? selectedColor : '#fff'} size={24} />
    default :
      break
  }
}

const CustomBottomTabIcon: FC<CustomBottomTabIconProps> = ({ isFocused, route }) => {
  return (
    <View>
      {renderIcon(route, isFocused)}
    </View>
  )
}

export default CustomBottomTabIcon
