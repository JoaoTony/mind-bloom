import { type FC, useState } from 'react'
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated'

import {
  Container,
  TabBarContentContainer,
  TabBarText,
  TabBarContentContainerBg
} from './styles'
import { type BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useWindowDimensions, StyleSheet, Pressable } from 'react-native'
import { useTheme } from 'styled-components/native'
import CustomBottomTabIcon from './botton-tab-icons'

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

const CustomBottomTab: FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { width } = useWindowDimensions()
  const theme = useTheme()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [position, setPosition] = useState<ElementPosition>(INITIAL_POSITION)

  const MARGIN = 20 || theme.spacing.padding.default
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
        <TabBarContentContainerBg index={state.index}>

        </TabBarContentContainerBg>
      </Animated.View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name

        const isFocused = state.index === index

        const onPress = () => {
          setSelectedIndex(index)
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, { merge: true })
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          })
        }

        return (
          <Pressable
            key={index.toString()}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
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
             {isFocused && <TabBarText style={{ color: isFocused ? theme.colors.green.dark : '#fff' }}>
                {label as string}
              </TabBarText>}
            </TabBarContentContainer>
          </Pressable>
        )
      })}
    </Container>
  )
}

export default CustomBottomTab
