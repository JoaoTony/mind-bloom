import { ChildCard } from "@/components/child-card"
import { FC, memo } from "react"
import { View, ViewToken } from "react-native"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"

type CustimChildCardProps = {
  data: any,
  viewableItems: Animated.SharedValue<ViewToken[]>
  onPress: () => void
}

export const CustimChildCard : FC<CustimChildCardProps> = memo(({ data, onPress, viewableItems }) => {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(viewableItems.value.filter(item => item.isViewable).find((viewableItem) => viewableItem.item.id === data.id))

    return {
      opacity: withTiming(isVisible ? 1: 0),
      transform: [{
        scale: withTiming(isVisible ? 1: 0.6)
      }]
    }
  })

  return (
    <Animated.View style={rStyle}>
      <ChildCard
        {...(data as any)}
        testType={"" as any}
        disabled={false}
        onPress={onPress}
      />
    </Animated.View>
  )

})
