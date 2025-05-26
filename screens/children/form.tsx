import { Input } from "@/components/input";
import { FC, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import { childrenStyles as styles } from "./children.styles"
import { useStorageState } from "@/constants/async-storage";
import { API } from "@/services/api";
import { apiEndpoints } from "@/constants/api-endpoints";
import { router } from "expo-router";

export type ChindrenModalFormProps = {
  onClose: () => void,
  onOK: () => void
  data?: any,
  role: string,
  gender: string,
}

const goToChat = (parentName: string, parentID: string) => {
  router.push({
    pathname: "/chat",
    params: {
      parentID,
      parentName,
    }
  });
}

export const ChindrenModalForm: FC<ChindrenModalFormProps> = ({ onClose, data, onOK, role, gender }) => {
  const [name, setName] = useState("")
  const [dateofBirth, setDateofBirth] = useState("")
  const [loading, setLoading] = useState(false)

  const { token: id } = useStorageState(true)

  const addKid = async (edit?: boolean) => {

    let objectToUpdate = {
      name,
      dateofBirth,
      gender
    } as any

    console.log("Vamos ver:", objectToUpdate)

    if(!edit) {
      objectToUpdate.parent_id = id
    }

    const { statusCode } = await API[edit ? "patch" : "post"](
      `${apiEndpoints.kids?.replace("{parent_id}", id || "")}${edit ? `/${data?.id || ""}` : ""}`,
      objectToUpdate
      ,
      setLoading
    )

    if (statusCode === 201) {
      onOK?.()
    }
  }

  return(
    <View style={{ width: '100%', gap: 10, marginTop: 20 }}>

      <View>
        <Text style={styles.label}>Nome da criança</Text>
        <Input
          placeholder="Nome da criança"
          style={styles.inputStyle}
          defaultValue={data?.name || ""}
          onChangeText={setName}
        />
      </View>
      <View>
        <Text style={styles.label}>Idade da criança</Text>
        <Input
          placeholder="EX: 10/10/2010"
          style={styles.inputStyle}
          onChangeText={setDateofBirth}
          defaultValue={data?.dateOfBirth?.toString() || ""}
        />
      </View>

      {data?.id && (
        <View>
          <Text style={styles.label}>Diagnóstico de TDAH em percentagem</Text>
          <Input
            placeholder={"Diagnóstico da criança"}
            style={[styles.inputStyle, { opacity: 0.7 }]}
            value={data?.adhdDiagnosisPercentage?.toString() || "0"}
            editable={false}
          />
        </View>
      )}
      {data?.id && (
        <View>
          <Text style={styles.label}>Diagnóstico de TEA em percentagem</Text>
          <Input
            placeholder="Diagnóstico da criança"
            style={[styles.inputStyle, { opacity: 0.7 }]}
            defaultValue={data?.asdDiagnosisPercertage?.toString() || "0"}
            editable={false}
          />
        </View>
      )}

      {role?.toString() === 'Psychologist' && (
         <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#3b4bc0', flex: 1 }]}
          onPress={() => {
            onClose()
            goToChat(data?.parent?.name || "", data?.parent?.id || "")
          }}
        >
          <Text style={[styles.buttonText, { color: "#fff" }]}>
            Contactar encarregado
          </Text>
        </TouchableOpacity>
        </View>
      )}

     {!data?.id && <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => onClose?.()}
        >
          <Text style={styles.buttonText}>Canclear</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#3b4bc0' }]}
          onPress={() => addKid(data?.id)}
        >
           {loading ? (
          <ActivityIndicator size="small" color={"#fff"}/>
        ) : (
          <Text style={[styles.buttonText, { color: "#fff" }]}>
            {data?.id ? "Editar" : "Cadastrar"}
          </Text>
        )}

        </TouchableOpacity>
      </View>}
    </View>
  )
}
