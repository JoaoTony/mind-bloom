import { ChatListCard } from "@/components/chat-list-card"
import { FC, memo } from "react"
import { Animated } from "react-native"
import { formatDateLabel } from "../chat/utils"

type CustimChildCardProps = {
  data: any,
  scale: Animated.AnimatedInterpolation<string | number>
  opacity: Animated.AnimatedInterpolation<string | number>
}

const formatdata = (data: any) => {
  if(!data) {
    return {
      id: '',
      name: '',
      avatar: '',
      message: '',
      date: '',
    }
  }

  return {
    id: data?.userId,
    name: data?.name,
    avatar: '',
    message: data?.lastMessage,
    date: formatDateLabel(data?.created_at || ""),
  }
}

export const CustimChildCard : FC<CustimChildCardProps> = memo(({ data, scale, opacity }) => {

  return (
    <Animated.View style={{ transform: [{ scale }], opacity }}>
      <ChatListCard
        {...formatdata(data)}
      />
    </Animated.View>
  )

})
