import { FC, PropsWithChildren, useEffect} from 'react';
import { View, Text, Modal, StyleSheet, Button, TouchableOpacity } from 'react-native';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

//import Modal from 'react-native-modal';


import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { modalStyles as styles } from "./modal.styles"

import Portal from '../portal';

export type CustomModalProps = {
  title: string
  isVisible?: boolean
  onClose: () => void
} & PropsWithChildren

export const CustomModal: FC<CustomModalProps> = ({ title, isVisible, onClose, children }) => {


  if (!isVisible) return null;


  return (
    <Portal name='modal'>
<View style={styles.overlay}>
      <TouchableOpacity style={styles.background} onPress={onClose} activeOpacity={1} />
      <View style={styles.modalBox}>
         <Text style={styles.title}>{title}</Text>

            <MaterialCommunityIcons
              name="window-close"
              size={24}
              color="black"
              style={styles.close}
              onPress={() => {
                onClose()

              }}
              />
        {children}
      </View>
    </View>
    </Portal>
  );
}

/*


<View style={[styles.modalOverlay]}>
        <View style={[styles.modalContent]}>



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

      </View>
*/
