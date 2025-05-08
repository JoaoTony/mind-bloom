import { FC, useCallback, useEffect, useState } from "react";

import AntDesign from '@expo/vector-icons/AntDesign';

import { childrenStyles as styles } from "./children.styles"
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native";
import { ChildCard } from "@/components/child-card";
import { CustomModal } from "@/components/modal";
import { ChindrenModalForm } from "./form";
import { API } from "@/services/api";
import { apiEndpoints } from "@/constants/api-endpoints";
import { useStorageState } from "@/constants/async-storage";
import { useFocusEffect } from "expo-router";


const ChildrenScreen: FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedChild, setSelectedChild] = useState({})
  const [kids, setkids] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)

  const { token: id } = useStorageState(true)

  const toggleModal = (isOpen: boolean) => {
    if(!isOpen) {
      setSelectedChild({})
    }
    setShowModal(isOpen)
  }

  const getKids = async (onLoading?: (isLoading: boolean) => void) => {
    const { data, statusCode } = await API.get(apiEndpoints.kids?.replace("{parent_id}", id || ""), {}, onLoading)

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
  }, []);

  useFocusEffect(
    useCallback(() => {
      if(id) {
        getKids()
      }
    }, [id])
  );

  return(
    <SafeAreaView style={{   flex: 1 }}>
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.title}>Crianças</Text>

          <AntDesign
            name="addusergroup"
            size={24}
            color="#4b4f59"
            onPress={() => toggleModal(true)}
          />
        </View>

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

        <ScrollView
          style={{ flex: 1 }}
           refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {kids.map((item: any) => (
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
        </ScrollView>

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
