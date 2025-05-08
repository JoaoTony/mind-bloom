import { Input } from "@/components/input";
import { FC, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import { childrenStyles as styles } from "./children.styles"
import { useStorageState } from "@/constants/async-storage";
import { API } from "@/services/api";
import { apiEndpoints } from "@/constants/api-endpoints";

export type ChindrenModalFormProps = {
  onClose: () => void,
  onOK: () => void
  data?: any
}

export const ChindrenModalForm: FC<ChindrenModalFormProps> = ({ onClose, data, onOK }) => {
  const [name, setName] = useState("")
  const [dateofBirth, setDateofBirth] = useState("")
  const [loading, setLoading] = useState(false)

  const { token: id } = useStorageState(true)

  const addKid = async (edit?: boolean) => {

    let objectToUpdate = {
      name,
      dateofBirth,
    } as any

    if(!edit) {
      objectToUpdate.parent_id = id
    }

    const { statusCode } = await API[edit ? "patch" : "post"](
      `${apiEndpoints.kids?.replace("{parent_id}", id || "")}${edit ? `/${data?.id || ""}` : ""}`,
      objectToUpdate
      ,
      setLoading
    )

    console.log("SSS:", `${apiEndpoints.kids?.replace("{parent_id}", id || "")}${edit ? `/${data?.id || ""}` : ""}`)

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
          <Text style={styles.label}>Diagnóstico de TDAH em percentagem()</Text>
          <Input
            placeholder="Diagnóstico da criança"
            style={[styles.inputStyle, { opacity: 0.7 }]}
            defaultValue={data?.adhdDiagnosisPercentage || "0"}
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
            defaultValue={data?.asdDiagnosisPercertage || "0"}
            editable={false}
          />
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
          style={[styles.button, { backgroundColor: '#144467' }]}
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
