import {FC} from "react"
import { ScrollView , SafeAreaView, FlatList} from "react-native"
import { homeSyles } from "./home.styles"
import { HomeHeader } from "./components/header"
import { HomeSearch } from "./components/serach"
import { HomeBanner } from "./components/banner"
import { HomeCategories } from "./components/categories"
import { DoctorCard } from "@/components/doctor-card"

const doctors = [
  {
    id: 1,
    name: "Dr. Ana Costa",
    star: 3.8,
    avatar: "https://example.com/avatars/ana.jpg",
    occupation: "Cardiologista"
  },
  {
    id: 2,
    name: "Dr. João Silva",
    star: 5,
    avatar: "https://example.com/avatars/joao.jpg",
    occupation: "Neurologista"
  },
  {
    id: 3,
    name: "Dr. Beatriz Lima",
    star: 4.9,
    avatar: "https://example.com/avatars/beatriz.jpg",
    occupation: "Pediatra"
  },
  {
    id: 4,
    name: "Dr. Ricardo Almeida",
    star: 4.7,
    avatar: "https://example.com/avatars/ricardo.jpg",
    occupation: "Cirurgião"
  },
  {
    id: 5,
    name: "Dr. Sofia Pereira",
    star: 4.6,
    avatar: "https://example.com/avatars/sofia.jpg",
    occupation: "Ginecologista"
  },
  {
    id: 6,
    name: "Dr. Pedro Fernandes",
    star: 4.8,
    avatar: "https://example.com/avatars/pedro.jpg",
    occupation: "Ortopedista"
  },
  {
    id: 7,
    name: "Dr. Mariana Santos",
    star: 4.7,
    avatar: "https://example.com/avatars/mariana.jpg",
    occupation: "Dermatologista"
  },
  {
    id: 8,
    name: "Dr. Felipe Souza",
    star: 1.9,
    avatar: "https://example.com/avatars/felipe.jpg",
    occupation: "Endocrinologista"
  },
  {
    id: 9,
    name: "Dr. Clara Martins",
    star: 4.6,
    avatar: "https://example.com/avatars/clara.jpg",
    occupation: "Psiquiatra"
  },
  {
    id: 10,
    name: "Dr. Bruno Oliveira",
    star: 4.7,
    avatar: "https://example.com/avatars/bruno.jpg",
    occupation: "Oftalmologista"
  }
];


const HomeScreen: FC = () => {
  return(
    <SafeAreaView style={homeSyles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <HomeHeader/>
            <HomeSearch/>
            <HomeBanner/>
            <HomeCategories/>
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
