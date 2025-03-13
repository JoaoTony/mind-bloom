import { FC } from "react";

import { userSyles as styles } from "./user.styles"
import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";

export type  EditButtonsProps = {
  isEditing: boolean,
  toggleIsEditing: (editing: boolean) => void,
  onSave: () => void
  saving: boolean
}

const EditButtons: FC<EditButtonsProps> = ({ isEditing, toggleIsEditing, onSave, saving }) => {
  return(
    <View style={styles.buttonContainer}>
      {isEditing ? (
         <>
        <TouchableOpacity
          onPress={() => toggleIsEditing(false)}
          style={[styles.button]}
        >
          <Text style={styles.cancel}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSave}
          style={[styles.buttonSave]}
        >
          {saving ? (
            <ActivityIndicator size={20} color="#fff" />
          ) : (
            <Text style={styles.buttonSaveText}>Salvar</Text>
          )}
        </TouchableOpacity>
         </>
      ): (
        <TouchableOpacity
          onPress={() => toggleIsEditing(true)}
          style={[styles.button]}
        >
          <Text style={styles.edit}>Editar</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default EditButtons
