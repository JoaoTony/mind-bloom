import { FC, useCallback, useEffect, useState } from "react";

import { testStyles as styles } from "./test.styles"
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Categories } from "@/components/categories";
import { ChildCard } from "@/components/child-card";
import { apiEndpoints } from "@/constants/api-endpoints";
import { API } from "@/services/api";
import { useStorageState } from "@/constants/async-storage";
import { useFocusEffect } from "expo-router";
import { testData } from "./data";

const TestScreen: FC = () => {
  const [type, setType] = useState("")
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const [kids, setkids] = useState([])

  const { token: id } = useStorageState(true)

  console.log("ID:", id)


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

  const onRefresh = useCallback(() => {
    if(id) {
      getKids(setRefreshing)
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      if(id) {
        getKids()
      }
    }, [id])
  );

  return(
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>Teste</Text>
        </View>

        <Text style={styles.text}>Para começar o teste para o diagnóstico é necessário selecionar o tipo de teste, e depois clicar em uma criança.</Text>

        <Categories
          onSelect={setType}
          selected={type}
        />

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

        {kids?.map((item: any) => (
          <ChildCard
            {...item}
            key={item.id}
            testType={type as any}
            disabled={!type}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default TestScreen
