import { type FC, useState, useEffect } from 'react'
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { useRouter } from 'expo-router'

import {
  Container,
  TabBarContentContainer,
  TabBarText,
  TabBarContentContainerBg
} from './styles'
import { type BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useWindowDimensions, StyleSheet, Pressable } from 'react-native'
import { useTheme } from 'styled-components/native'
import CustomBottomTabIcon, { menuList } from './botton-tab-icons'
import { defualtTheme } from '@/styles/theme'
import { useNavigation } from 'expo-router'

export interface ElementPosition {
  height: number
  width: number
  x: number
  y: number
}

const INITIAL_POSITION = {
  height: 48,
  width: 150,
  x: 10,
  y: 10
}

const CustomBottomTab: FC<{ onChangeActive: (index: number) => void }> = ({ onChangeActive }) => {
  const { width } = useWindowDimensions()
 // const theme = useTheme()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [position, setPosition] = useState<ElementPosition>(INITIAL_POSITION)

  // useEffect(() => {
  //   onChangeActive(0)
  // }, [])

  const router = useRouter()

  const navigation = useNavigation()

  const MARGIN = 20 || defualtTheme.spacing.padding.default
  const TAB_BAR_WIDTH = width - MARGIN * 2

  const tranalateAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(position.x) }]
    }
  })

  return (
    <Container
      style={{
        width: TAB_BAR_WIDTH,
        bottom: MARGIN
      }}
    >
      <Animated.View
        style={[{
          ...StyleSheet.absoluteFillObject,
          alignItems: 'center',
          justifyContent: 'center',
          width: position.width
        }, tranalateAnimation]}
      >
        <TabBarContentContainerBg index={selectedIndex}>

        </TabBarContentContainerBg>
      </Animated.View>
      {menuList.map((route, index) => {
        // const { options } = descriptors[route.key]

        // const label =
        //   options.tabBarLabel !== undefined
        //     ? options.tabBarLabel
        //     : options.title !== undefined
        //       ? options.title
        //       : route.name

        const isFocused = selectedIndex === index

        const onPress = () => {
          setSelectedIndex(index)
          onChangeActive?.(index)
          // const event = navigation.emit({
          //   type: 'tabPress',
          //   target: route.key,
          //   canPreventDefault: true
          // })

          router.push(`/${index === 0 ? "(tabs)" : route.name}` as any)

          //navigation.navigate(route.name, { merge: true })
          //if (!isFocused && !event.defaultPrevented) {

        }

        const onLongPress = () => {
          // navigation.emit({
          //   type: 'tabLongPress',
          //   target: route.key
          // })
        }

        return (
          <Pressable
            key={index.toString()}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            // accessibilityLabel={options.tabBarAccessibilityLabel}
            // testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ padding: 10 }}

            onLayout={event => {
              const layout = event.nativeEvent.layout

              if (selectedIndex === index) {
                setPosition(layout)
              }
            }}
          >
            <TabBarContentContainer
              isFocused={isFocused}

            >
              <CustomBottomTabIcon route={route.name} isFocused={isFocused} />
             {isFocused && <TabBarText style={{ color: isFocused ? defualtTheme.colors.green.dark : '#fff' }}>
                {route.label }
              </TabBarText>}
            </TabBarContentContainer>
          </Pressable>
        )
      })}
    </Container>
  )
}

export default CustomBottomTab
