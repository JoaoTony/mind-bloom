import { type FC } from 'react'
import { View } from 'react-native'

import {AntDesign, Octicons, MaterialCommunityIcons} from "@expo/vector-icons"
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

const width = 20
const height = 20

const renderIcon = (route: string, isFocused: boolean) => {
  switch (route) {
    case 'index':
      return   <MaterialCommunityIcons name={isFocused ? 'home' : 'home-outline'} color={isFocused ? selectedColor : '#fff'}  size={24} />
      //return isFocused ? <HomeIconSelected width={width} height={height}/> : <HomeIcon width={width} height={height}/>
    case 'exam':
      return  <MaterialCommunityIcons name={isFocused ? 'file-document-edit' : 'file-document-edit-outline'} color={isFocused ? selectedColor : '#fff'} size={24} />
      //return <MarketplaceIcon width={width} height={height} fill={isFocused ? selectedColor : 'transparent'}/>
    case 'children':
      return <FontAwesome6 name="children"  color={isFocused ? selectedColor : '#fff'}  size={24} />
     // return isFocused ? <FavouritesIconSelected width={width} height={height}/> : <FavouritesIcon width={width} height={height}/>
    case 'user':
      return  <Octicons name={isFocused ? 'person-fill' : 'person'} color={isFocused ? selectedColor : '#fff'} size={24} />
      //return <ProfileIcon width={width} height={height} fill={isFocused ? selectedColor : 'transparent'}/>
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
