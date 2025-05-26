import { FC, useCallback, useEffect, useRef, useState } from "react";

import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Fab } from '@masumdev/rn-fab';

import { chatListStyles as styles } from "./chat-list.styles"
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View, ViewToken, Animated } from "react-native";
import { ChildCard } from "@/components/child-card";
import { CustomModal } from "@/components/modal";
import { API } from "@/services/api";
import { apiEndpoints } from "@/constants/api-endpoints";
import { useStorageState } from "@/constants/async-storage";
import { router, useFocusEffect } from "expo-router";
//import Animated, { useSharedValue } from "react-native-reanimated";
import { CustimChildCard } from "./custom-card";
import { Ionicons } from "@expo/vector-icons";
import { Empty } from "@/components/empty";

const goBack = () => {
  router.back()
}

const ParentChatListScreen: FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedChild, setSelectedChild] = useState({})
  const [kids, setkids] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedGender, setSelectedGender] = useState("")

  const { token: id } = useStorageState(true)

  const toggleModal = (isOpen: boolean) => {
    if(!isOpen) {
      setSelectedChild({})
    }
    setShowModal(isOpen)
  }

  const getKids = async (onLoading?: (isLoading: boolean) => void) => {
    const { data, statusCode } = await API.get(`${apiEndpoints.chat}/${id}`, {}, onLoading)

console.log("AQUI:", data, statusCode)
    if(statusCode === 200) {
      setkids(data)
    }
  }

  useEffect(() => {
    if(id) {
      getKids(setLoading)
    }
  }, [id])

  const onAddOK = () => {
    toggleModal(false)
    getKids()
  }

  const onRefresh = useCallback(() => {
    getKids(setRefreshing)
  }, [refreshing]);

  useFocusEffect(
    useCallback(() => {
      if(id) {
        getKids()
      }
    }, [id])
  );

  const onModalOpen = (gender: "male" | "female") => {
    setSelectedGender(gender)
    toggleModal(true)
  }

  const viewableItems: any = []

  const scrollY = useRef(new Animated.Value(0)).current

  const SPACING = 20
  const ITEM_SIZE = 100 + 40

  return(
    <SafeAreaView style={{   flex: 1 }}>
      <>

        <Animated.FlatList
          data={kids || []}
          style={styles.container}
           refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListHeaderComponent={(
            <>
            <View style={styles.header}>
              <Ionicons
                name="chevron-back"
                size={24} color="black"
                onPress={goBack}
              />
              <Text style={styles.title}>Chats com psicólogos</Text>
            </View>
            </>
          )}
          ListEmptyComponent={(
            <>
            {loading && (
          <View style={{
            flex: 1,
            marginTop: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ActivityIndicator size="small" color="#144467"/>
          </View>
        )}
         {!loading && !kids?.length  &&(
          <Empty/>
        )}
            </>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
          keyExtractor={item => (item as any).id}
          renderItem={({ index, item }) => {
            const inputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 2)
            ]

             const opacityInputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 1)
            ]

            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [
                1, 1, 1, 0
              ]
            })

             const opacity = scrollY.interpolate({
              inputRange: opacityInputRange,
              outputRange: [
                1, 1, 1, 0
              ]
            })

            return(
              <CustimChildCard
                data={item}
                opacity={opacity}
                scale={scale}
              />)
            }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY}}}],
            { useNativeDriver:true }
          )}
          // onViewableItemsChanged={({ viewableItems: items }) => {
          //   viewableItems.value = items
          // }}
        />

      </>

    </SafeAreaView>
  )
}

export default ParentChatListScreen
