import {FC} from "react"
import { ScrollView , SafeAreaView, FlatList} from "react-native"
import { homeSyles } from "./home.styles"
import { HomeHeader } from "./components/header"
import { HomeSearch } from "./components/serach"
import { HomeBanner } from "./components/banner"
import { Categories } from "../../components/categories"
import { DoctorCard } from "@/components/doctor-card"

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


const HomeScreen: FC = () => {
  return(
    <SafeAreaView style={homeSyles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <HomeHeader/>
            {/* <HomeSearch/> */}
            <HomeBanner/>
            <Categories/>
          </>
        }
        contentContainerStyle={{
          paddingBottom: 30
        }}
        data={doctors}
        keyExtractor={item => item.id?.toString()}
        renderItem={({item}) => (
          <DoctorCard {...item}/>
        )}
        style={homeSyles.content}

      />
    </SafeAreaView>
  )
}

export default HomeScreen
