import { FC, useState } from "react";
import { ActivityIndicator, Button, Text, TouchableOpacity, View } from "react-native";

import { testStyles as styles } from "./test.styles"
import { router } from "expo-router";
import { apiEndpoints } from "@/constants/api-endpoints";
import { API } from "@/services/api";

type ConfirmModalProps = {
  onClose: () => void,
  childName: string
  percentage: number
  childID: string,
  id: string
  testType: 'TEA' | 'TDAH'
}

export const ConfirmModal: FC<ConfirmModalProps> = ({ onClose, childName, percentage, childID, id, testType }) => {
  const [loading, setLoading] = useState(false)
  const sendToDoctors = () => {
    onClose?.()

    router.push("/(tabs)")
  }

  const dataToUpdate = () => {
    if(testType === "TDAH") {
      return {
        adhdDiagnosisPercentage: percentage,
        //adhdDiagnosis: true
      }
    }

    return {
      asdDiagnosisPercertage: percentage,
      //asdDiagnosis: true
    }
  }

  const onOK = async () => {
    const { statusCode, data } = await API.patch(`${apiEndpoints.kids?.replace("{parent_id}", id || "")}/${childID}`, {
      ...dataToUpdate(),
      //parent_id: id
    },
    setLoading
    )

    console.log("AQUI:", statusCode, data, dataToUpdate(),  {parent_id: id})

    if (statusCode === 201) {
      onClose?.()
    }
  }

  console.log(`${apiEndpoints.kids?.replace("{parent_id}", id || "")}/${childID}`)

  return(
    <View>
      <Text
        style={{
          color: "#717F7F",
          fontSize: 16
          }}
        >
        Pelo questionário preenchido, existe {percentage}% de chances do(a) {childName || "Crinaça"} ter {testType}
      </Text>

      <Text
        style={{
          color: "#717F7F",
          fontSize: 16,
          marginTop: 10,
          marginBottom: 20
          }}
        >
        Desja salvar o diagnóstico da criança?
      </Text>

      <Text
        style={{
          color: "#717F7F",
          fontSize: 16,
          marginTop: 10,
          marginBottom: 20,
          alignItems: "center"
          }}
        >
        Se desejar, pode consultar um médico {" "}
        <TouchableOpacity
          style={{ alignItems: 'center', justifyContent: "center" }}
          onPress={sendToDoctors}
        >
          <Text style={{ color: "#144467", fontWeight: 700, marginBottom: -4 }}>Aqui</Text>
        </TouchableOpacity>
      </Text>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => onClose?.()}
        >
          <Text style={styles.buttonText}>Canclear</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#144467' }]}
          onPress={onOK}
        >
          {loading ? <ActivityIndicator size="small" color={"#fff"}/> :

            <Text style={[styles.buttonText, { color: "#fff" }]}>Salvar</Text>}
        </TouchableOpacity>
      </View>
    </View>
  )
}
