import { FC, useEffect, useState } from "react";
import { chatStyles as styles } from "./chat.styles"
import { SafeAreaView, Text, View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Chat from "./chat";
import { API } from "@/services/api";
import { apiEndpoints } from "@/constants/api-endpoints";
import { useStorageState } from "@/constants/async-storage";
import { formatDateLabel } from "./utils";

const goBack = () => {
  router.back()
}

const formatMessage = (item: any) => {
  if(!item) {
    return {
      owner: "",
      message: "",
      date: ""
    }
  }

  return {
    owner: item?.sender?.id || "",
    message: item?.content || "",
    date: formatDateLabel(item?.created_at || "")
  }
}

const ChatScreen: FC = () => {
  const [input, setInput] = useState("")
  const {
    parentName,
    parentID,
  } = useLocalSearchParams()
  const { token: id } = useStorageState(true)

  const [messages, setMessages] = useState<any[]>([])

  const getMessages = async() => {
    if(!parentID || !id) return
    const { data, statusCode } = await API.get(`${apiEndpoints.chat}/${parentID}/${id}`)

    console.log("Data:", data, statusCode)

    if(statusCode === 200) {
      setMessages(data?.map(formatMessage).reverse())
    }

  }

  useEffect(() => {
    getMessages()
    const interval = setInterval(() => {
      getMessages()
      //console.log("FUI chamado")
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [id, parentID])

  const sendMessage = async () => {
    setInput("")
    const {data, statusCode} = await API.post(apiEndpoints.chat,
      JSON.stringify({
      sender_id: id,
      receiver_id: parentID,
      content: input
    }, null, -2))

  }

  return(
     <View style={styles.container}>
      <View style={styles.header}>
         <Ionicons
          name="chevron-back"
          size={24}
          color="black"
          onPress={goBack}
        />
        <Text numberOfLines={1} style={styles.title}>{parentName || ""}</Text>
      </View>

      <View style={styles.chat}>

        {messages?.length && <Chat messages={messages} userId={id} />}
        <View style={styles.footer}>
       <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.buttonSend} onPress={sendMessage} >
            <FontAwesome name="send" size={18} color="white" />
          </TouchableOpacity>
       </View>
      </View>
      </View>


     </View>
  )
}

export default ChatScreen
