import { FC, PropsWithChildren} from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { modalStyles as styles } from "./modal.styles"

export type CustomModalProps = {
  title: string
  isVisible?: boolean
  onClose: () => void
} & PropsWithChildren

export const CustomModal: FC<CustomModalProps> = ({ title, isVisible, onClose, children }) => {
  return(
    <Modal
      isVisible={isVisible}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        <MaterialCommunityIcons
          name="window-close"
          size={24}
          color="black"
          style={styles.close}
          onPress={onClose}
        />

        {children}
      </View>
    </Modal>
  )
}
