import { Dimensions } from 'react-native'
import { colors } from './colors'
import { fonts } from './fonts'

export const defualtTheme = {
  buttonRadius: 54,
  defaultRadius: 12,
  ddefaultFormElementHeight: 56,
  ddefaultFormElementTextSize: 18,
  deviceWidth: Dimensions.get('screen').width,
  spacing: {
    padding: {
      default: Dimensions.get('screen').width <= 700 ? 20 : 32
    },
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
    32: 128,
    40: 160,
    48: 192,
    56: 224,
    64: 256
  },
  colors,
  fonts
}

export type DefualtThemeProps = typeof defualtTheme
