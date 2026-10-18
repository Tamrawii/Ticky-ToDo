import { Pressable } from 'react-native';
import { styles } from '../styles/theme'
import { AntDesign } from '@expo/vector-icons';

export const Fab = ({showBttomSheet}) => {
  return (
    <Pressable style={styles.fab} onPress={showBttomSheet}>
      <AntDesign name="plus" size={24} color="#fff" />
    </Pressable>
  )
}
