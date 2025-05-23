import { FC, useEffect, useState } from "react";

import { userSyles as styles } from "./user.styles"
import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Input } from "@/components/input";
import EditButtons from "./edit-button";
import { asyncSetToken, useStorageState } from "@/constants/async-storage";
import { router } from "expo-router";
import { API } from "@/services/api";
import { apiEndpoints } from "@/constants/api-endpoints";

const UserSettings: FC = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const { token: id } = useStorageState(true)

  const toggleIsEditing = (editing: boolean) => {
    setIsEditing(editing)
  }

  const onSave = () => {
    setSaving(true)
    setTimeout(() => {
      alert("DADOS SALVOS COM SUCESSO!")
      setSaving(false)
    }, 2000)
  }

  const getUser = async () => {
    const { data } = await API.get(`${apiEndpoints.me}/${id}`)

    if(data?.id) {
      setName(data?.name || "")
      setEmail(data?.email || "")
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
    await asyncSetToken("" as any);

    router.replace("/login")
  }

  return(
    <View style={styles.container}>
        <View style={styles.avatarWrapper}>
        <View style={styles.avatarWrapperWrapper}>
          <AntDesign name="user" size={24} color="black" />
        </View>

        </View>
      <View style={styles.content}>

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
    </View>
  )
}

export default UserSettings
