import {FC, useCallback, useEffect, useState} from "react"
import { ScrollView , SafeAreaView, FlatList, RefreshControl, ActivityIndicator, Text, View} from "react-native"
import { homeSyles } from "./home.styles"
import { HomeHeader } from "./components/header"
import { HomeSearch } from "./components/serach"
import { HomeBanner } from "./components/banner"
import { Categories } from "../../components/categories"
import { DoctorCard } from "@/components/doctor-card"
import { apiEndpoints } from "@/constants/api-endpoints"
import { API } from "@/services/api"
import { useFocusEffect } from "expo-router"

const Doctor = require("@/assets/images/doctor.png")

const doctors = [
  {
    id: 1,
    name: "Dr. João Silva",
    star: 3.8,
    avatar: require('@/assets/images/african-american-black-doctor-man-with-stethoscope-isolated-white-background 1.png'),
    occupation: "Psicólogo Infantil",
    description: "Especialista no cuidado emocional e comportamental de crianças, com atuação em transtornos como TDAH, TEA, ansiedade e dificuldades escolares. Utiliza abordagens lúdicas para promover o desenvolvimento saudável e fortalecer os vínculos familiares."
  },
  {
    id: 2,
    name: "Dra. Ana Costa",
    star: 5,
    avatar: require("@/assets/images/doctor.png"),
    occupation: "Psicóloga & NeuroLogista",
    description: "Profissional com atuação integrada em saúde mental e neurologia, especializada no diagnóstico e tratamento de condições que afetam o cérebro e o comportamento. Foco em abordagens clínicas que unem conhecimento psicológico e neurológico para promover o bem-estar dos pacientes."
  }
];

const formatItem = (item: any) => {
  return {
    name: item?.name || '',
    star: item?.rating || 0,
    occupation: item?.occupation || '',
    description: item?.description || '',
    avatar: item?.image,
    id: item?.id,
  }
}

const filter = (list: any[]) => {
  return list.filter(item => item.role === "Psychologist")?.map(formatItem)
}


const HomeScreen: FC = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const getUsers = async (onLoading?: (isLoading: boolean) => void) => {
    const { data, statusCode } = await API.get(`${apiEndpoints.me}?role=Psychologist`, {}, onLoading)


    if(statusCode === 200) {
      setList(filter(data?.data || []))
    }
   // console.log("Dataaaa:",data)
  }

  console.log("listagem:", list, list?.length)

  useEffect(() => {
    getUsers(setLoading)
  }, [])

  const onRefresh = useCallback(() => {
    getUsers(setRefreshing)
  }, [refreshing]);

  useFocusEffect(
    useCallback(() => {

      getUsers()

    }, [])
  );

  return(
    <SafeAreaView style={homeSyles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <>
            <HomeHeader/>
            {/* <HomeSearch/> */}
            <HomeBanner/>
            <Categories/>
            <Text style={homeSyles.title}>Pisicólogos</Text>
          </>
        }
        contentContainerStyle={{
          paddingBottom: 130
        }}
        data={list}
        keyExtractor={item => item.id?.toString()}
        renderItem={({item}) => (
          <DoctorCard {...item}/>
        )}
        style={homeSyles.content}
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
              {!loading && !list.length && (
                <View
                  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                >
                  <Text>Lista vazia</Text>
                </View>
              )}
            </>
          )}
      />
    </SafeAreaView>
  )
}

export default HomeScreen
