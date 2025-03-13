import { FC, useState } from "react";

import { userSyles as styles } from "./user.styles"
import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Input } from "@/components/input";
import EditButtons from "./edit-button";

const UserSettings: FC = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const [name, setName] = useState("Dr Rui Mingas")
  const [email, setEmail] = useState("ruimingas@gmail.com")
  const [childName, setChildName] = useState("Rui Mingas JR")

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

  const inputBG = isEditing ? '#e2e7f3' : '#e2e7f350'

  return(
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.avatarWrapper}>
          <AntDesign name="user" size={24} color="black" />
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

          <Text style={styles.label}>Nome da criança:</Text>
          <Input
            value={childName}
            style={{ backgroundColor: inputBG }}
            editable={isEditing}
            onChangeText={setChildName}
          />

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
