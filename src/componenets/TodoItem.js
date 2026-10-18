import { Pressable, TextInput, View, TouchableOpacity } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import { styles } from '../styles/theme';
import { AntDesign } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Ionicons from '@expo/vector-icons/Ionicons';

export const TodoItem = ({ title, isDone, isEditing, onToggle, onDelete, onEdit, onSubmitEdit }) => {
  const swipeableRef = useRef(null);
  const inputRef = useRef(null);
  const [draft, setDraft] = useState(title);

  // When edit mode starts: load the current title and focus the input
  useEffect(() => {
    if (isEditing) {
      setDraft(title);
      inputRef.current?.focus();
    }
  }, [isEditing]);

  // Close the row after an action, then run the action
  const runAction = (action) => () => {
    swipeableRef.current?.close();
    action?.();
  };

  const renderRightActions = () => (
    <View style={styles.actionContainer}>
      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: '#ef4444' }]}
        onPress={runAction(onDelete)}
      >
        <Ionicons name="trash-outline" size={20} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: '#f97316' }]}
        onPress={runAction(onEdit)}
      >
        <Ionicons name="options-outline" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.swipeWrapper}>
      <Swipeable
        ref={swipeableRef}
        renderRightActions={renderRightActions}
        overshootRight={false}
      >
        <Pressable onPress={isEditing ? undefined : onToggle} style={styles.todoItem}>
          {/* Circular checkbox */}
          <View style={!isDone ? styles.checkbox : styles.checkboxChecked}>
            {isDone && <AntDesign name="check" color="#fff" />}
          </View>
          <TextInput
            ref={inputRef}
            style={[!isDone ? styles.bodyText : styles.deletedTask, { flex: 1 }]}
            value={isEditing ? draft : title}
            editable={isEditing}
            pointerEvents={isEditing ? 'auto' : 'none'}
            onChangeText={setDraft}
            returnKeyType="done"
            onSubmitEditing={() => onSubmitEdit?.(draft)}
          />
        </Pressable>
      </Swipeable>
    </View>
  );
};
