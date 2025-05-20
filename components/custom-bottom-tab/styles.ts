import styled from 'styled-components/native'
// import { PixelRatio } from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'
import { colors } from '@/styles/colors'

// const fontScale = PixelRatio.getFontScale()
// const getFontSize = (size: number) => size / fontScale

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => colors.green.dark};

  align-self: center;

  flex-direction: row;

  height: 72px;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;

  position: absolute;

  border-radius: 100px;
`

export const TabBarContentContainer = styled.View<{ isFocused: boolean }>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 3px;
  width: ${({ isFocused }) => isFocused ? '112px' : '48px'} ;


  height: 48px;
  border-radius: 51px;
  `
// background-color: ${({ isFocused }) => isFocused ? '#fff' : 'transparent'};

export const TabBarText = styled.Text`
  font-size: ${RFValue(11, 700)}px;
`

const marginLeft = (index: number) => {
  switch (index) {
    case 0:
      return 40
    case 1:
      return 20
    case 2:
      return -10
    case 3:
      return -40
    default:
      return 0
  }
}

export const TabBarContentContainerBg = styled.View<{ index: number }>`
  width: 112px;
  height: 48px;
  border-radius: 51px;
  background: #FFF;
`
