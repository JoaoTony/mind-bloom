import { FC, useCallback, useEffect, useState } from "react";

import { userSyles as styles } from "./user.styles"
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Input } from "@/components/input";
import EditButtons from "./edit-button";
import { asyncRemoveAll, useRole, useStorageState } from "@/constants/async-storage";
import { router } from "expo-router";
import { API } from "@/services/api";
import { apiEndpoints } from "@/constants/api-endpoints";
import { InputSelect } from "@/components/input/select";
import { Stars } from "@/components/stars";

const genders = [
  {
    label: "Masculino",
    value: "male"
  },
  {
    label: "Feminino",
    value: "Female"
  }
]

const buildSocials = (...items: string[]): string => {
  return items.join(', ');
};
const parseSocials = (socials: string): string[] => {
  return socials.split(',').map(item => item.trim());
};

const UserSettings: FC = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("")
  const [occupation, setOccupation] = useState("")
  const [description , setDescription ] = useState("")
  const [password, setPassword] = useState("")
  const [facebook, setFacebook] = useState("")
  const [number, setNumber] = useState("")
  const [stars, setStars] = useState(0)

  const [refreshing, setRefreshing] = useState(false)

  const { token: id } = useStorageState(true)

  const { loading: loadingRole, role } = useRole()


  const toggleIsEditing = (editing: boolean) => {
    setIsEditing(editing)
  }

 console.log(buildSocials(facebook))

  const onSave = async () => {
   // setSaving(true)
    buildSocials(facebook)

   const dataToSave = role === "Psychologist" ? {
      name,
      email,
      gender,
      occupation,
      description,
      socials: buildSocials(facebook, number),
     // image: 'https://raw.githubusercontent.com/JoaoTony/mind-bloom/refs/heads/main/assets/images/docs/francisco.png'
   } : {
    name,
      email,
      gender
   }

    const { data, statusCode } = await API.patch(`${apiEndpoints.me}/${id}`, dataToSave, setSaving)


   // setSaving(false)
  }

  const getUser = async (isLoading?: (lading: boolean) => void) => {
    const { data } = await API.get(`${apiEndpoints.me}/${id}`, {}, isLoading)

    console.log("Data.rating:", data.rating)

    if(data?.id) {
      setName(data?.name || "")
      setEmail(data?.email || "")
      setGender(data?.gender || "")
      setOccupation(data?.occupation || "")
      setDescription(data?.description || "")
      setFacebook(parseSocials(data?.socials)[0])
      setNumber(parseSocials(data?.socials)[1])
      setStars(data?.rating || 0)
    }

    console.log("Data:",data)
  }


  useEffect(() => {
    if(id) {
      getUser()
    }
  }, [id])

  const inputBG = isEditing ? '#e2e7f3' : '#e2e7f350'

  const signOut = async () => {
    await asyncRemoveAll();

    router.replace("/login")
  }
  const onRefresh = useCallback(() => {
    getUser(setRefreshing)
  }, [refreshing]);

  return(
    <ScrollView
      style={styles.container}
      contentContainerStyle={{  alignItems: 'center', paddingBottom: 120 }}
      refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
    >
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarWrapperWrapper}>
            <AntDesign name="user" size={24} color="black" />
          </View>


        </View>


      <View style={styles.content}>
        <View style={{ marginTop: 20, display: role === "Psychologist" ? "flex"  : "none" }}>
          <Stars stars={stars}/>
        </View>

        <View style={styles.texts}>

          <Text style={styles.label}>Nome:</Text>
          <Input
            value={name}
            style={{ backgroundColor: inputBG }}
            editable={isEditing}
            onChangeText={setName}
          />

          <Text style={styles.label}>Email:</Text>
          <Input
            value={email}
            style={{ backgroundColor: inputBG }}
            editable={isEditing}
            onChangeText={setEmail}
          />
          {role === "Psychologist" && (
            <>
            <Text style={styles.label}>Profissão:</Text>
            <Input
              value={occupation}
              style={{ backgroundColor: inputBG }}
              editable={isEditing}
              onChangeText={setOccupation}
            />
          <Text style={styles.label}>Descrição:</Text>
            <Input
              value={description}
              style={{ backgroundColor: inputBG, height: 150 }}
              editable={isEditing}
              onChangeText={setDescription}
              numberOfLines={48}
               textAlignVertical="top"
                multiline={true}
            />
            <Text style={styles.label}>Link do Facebook:</Text>
            <Input
              value={facebook}
              style={{ backgroundColor: inputBG }}
              editable={isEditing}
              onChangeText={setFacebook}
            />
            <Text style={styles.label}>WhatsApp:</Text>
            <Input
              value={number}
              style={{ backgroundColor: inputBG }}
              editable={isEditing}
              onChangeText={setNumber}
            />

            </>
          )}

          <Text style={styles.label}>Gênero:</Text>

          <InputSelect
            style={{ backgroundColor: inputBG, borderWidth: 0, borderRadius: 8 }}
            placeholder="Gênero"
            data={genders}
            value={gender}
            onChangeText={setGender}
          />

          <TouchableOpacity
            onPress={() => signOut()}
            style={[styles.button]}
          >
            <Text style={[styles.edit, { color: "#F0142F" }]}>Terminar sessãso</Text>
          </TouchableOpacity>

        </View>

      </View>

      <EditButtons
        isEditing={isEditing}
        toggleIsEditing={toggleIsEditing}
        onSave={onSave}
        saving={saving}
      />
    </ScrollView>
  )
}

export default UserSettings
