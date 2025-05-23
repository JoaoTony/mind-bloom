import { FC, useCallback, useEffect, useState } from "react";

import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Fab } from '@masumdev/rn-fab';

import { childrenStyles as styles } from "./children.styles"
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View, ViewToken } from "react-native";
import { ChildCard } from "@/components/child-card";
import { CustomModal } from "@/components/modal";
import { ChindrenModalForm } from "./form";
import { API } from "@/services/api";
import { apiEndpoints } from "@/constants/api-endpoints";
import { useStorageState } from "@/constants/async-storage";
import { useFocusEffect } from "expo-router";
import { useSharedValue } from "react-native-reanimated";
import { CustimChildCard } from "./custom-card";


const ChildrenScreen: FC = () => {
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
    const { data, statusCode } = await API.get(apiEndpoints.kids?.replace("{parent_id}", id || ""), {}, onLoading)

    console.log("KIF:", data)

    if(data?.data) {
      setkids(data.data)
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

  const viewableItems = useSharedValue<ViewToken[]>([])

  return(
    <SafeAreaView style={{   flex: 1 }}>
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

        {/* <ScrollView
          style={{ flex: 1 }}
           refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {!loading && kids.map((item: any) => (
            <ChildCard
              {...item}
              key={item.id}
              testType={"" as any}
              disabled={false}
              onPress={id => {
                setSelectedChild(item)
                toggleModal(true)
              }}
            />
          ))}
        </ScrollView> */}

        <FlatList
          data={kids || []}
          style={styles.container}
          ListHeaderComponent={(
            <>
            <View style={styles.header}>
              <Text style={styles.title}>Crianças</Text>
            </View>
            </>
          )}
          keyExtractor={item => (item as any).id}
          renderItem={item => (
            // <ChildCard
            //   {...(item as any).item}
            //   testType={"" as any}
            //   disabled={false}
            //   onPress={id => {
            //     setSelectedChild(item)
            //     toggleModal(true)
            //   }}
            // />
            <CustimChildCard
              data={item.item}
              onPress={() => {
                setSelectedChild(item)
                toggleModal(true)
              }}
              viewableItems={viewableItems}
            />
          )}
          onViewableItemsChanged={({ viewableItems: items }) => {
            viewableItems.value = items
          }}
        />

      </>

      <View
        style={styles.floating}
      >
        <Fab
          variant="clustered"
          // style={{ backgroundColor: "#3b4bc0", borderRadius: 30 }}
          items={[
            {
              icon: <FontAwesome name="female" size={24} color="white" />,
              label: "Feminino",
              onPress: () => onModalOpen("female")
            },
            {
              icon: <FontAwesome name="male" size={24} color="white" />,
              label: "Masculino",
              onPress: () => onModalOpen("male")
            }
          ]}
          theme="light"
        />
      </View>

      <CustomModal
        isVisible={showModal}
        title={(selectedChild as any)?.id ? "Dados da criança" :"Cadastrar criança"}
        onClose={() => toggleModal(false)}
      >
        <ChindrenModalForm
          onClose={() => toggleModal(false)}
          onOK={onAddOK}
          data={selectedChild}
        />
      </CustomModal>
    </SafeAreaView>
  )
}

export default ChildrenScreen
