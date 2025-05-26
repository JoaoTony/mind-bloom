import { ChildCard } from "@/components/child-card"
import { FC, memo } from "react"
import { View, ViewToken } from "react-native"
import { Animated } from "react-native"

type CustimChildCardProps = {
  data: any,
  scale: Animated.AnimatedInterpolation<string | number>
  opacity: Animated.AnimatedInterpolation<string | number>
  onPress: () => void
}

export const CustimChildCard : FC<CustimChildCardProps> = memo(({ data, onPress, scale, opacity }) => {
  return (
    <Animated.View style={{ transform: [{ scale }], opacity }}>
      <ChildCard
        {...(data as any)}
        testType={"" as any}
        disabled={false}
        onPress={onPress}
      />
    </Animated.View>
  )

})
