import { StatusBar } from "expo-status-bar";
import React, { useRef, useMemo, useCallback, useEffect } from "react";
import { Pressable, StyleSheet, Text, View, Button, Alert, TextInput, Image } from "react-native";
import { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TodoItem } from "./src/componenets/TodoItem";
import { useTodos } from "./src/hooks/useTodos";
import { styles } from "./src/styles/theme";
import { Fab } from "./src/componenets/Fab";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import * as Progress from 'react-native-progress';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function App() {
  const { todosList, updateTaskStatus, editTask, addTask, deleteTask, totalTasks, doneTasks, setTodosList } = useTodos();
  const [editingId, setEditingId] = useState(null);
  const [text, setText] = useState("");
  const [isInputShown, toggleInput] = useState(false)

  const handleEdit = (id) => {
    setEditingId(id)
  };

  const handleSubmitEdit = (id, newTitle) => {
    editTask(id, newTitle)
    setEditingId(null)
  }

  // 1. Create a reference for the cannon
    const confettiRef = useRef(null);

    // 2. Trigger function
    const handleCelebrate = () => {
      if (confettiRef.current) {
        confettiRef.current.start(); // Start the animation
      }
    };

    // Runs after the re-render, so doneTasks/totalTasks are up to date.
    // Only celebrate when the list *becomes* fully done.
  const wasAllDone = useRef(false);

  const showCustomDialog = () => {
    Alert.alert(
      "Congratulations!", // 1. Title
      "You have completed all your tasks! Do you want to clear your inbox?", // 2. Body / Message
      [
        // 3. Custom Buttons Array
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel" // iOS only: styles text as bold/blue
        },
        {
          text: "Clear",
          onPress: () => setTodosList([]),
          style: "destructive" // iOS only: turns text red
        }
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    // 1. Move async logic into an internal function
    const checkCompletion = async () => {
      const allDone = totalTasks > 0 && doneTasks === totalTasks;

      if (allDone && !wasAllDone.current) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        handleCelebrate();
        await new Promise(resolve => setTimeout(resolve, 1000));
        showCustomDialog()
      }

      wasAllDone.current = allDone;
    };

    // 2. Call it immediately
    checkCompletion();

    // 3. (Optional) Return a cleanup function if needed
  }, [doneTasks, totalTasks]);


  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Inbox</Text>

          <View style={{display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'center'}}>
            <View style={{ flex: 1 }}>
                <Progress.Bar
                  progress={doneTasks/totalTasks}
                  width={null}
                  borderRadius={0}
                  height={2}
                  borderWidth={0}
                  unfilledColor="#eee"
                  color="#000"
                />
              </View>
            <Text style={{ color: '#ddd' }}>{doneTasks}/{totalTasks}</Text>
          </View>

          {todosList.length === 0 && !isInputShown ?
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={require('./assets/no-tasks.png')}
                  style={{ width: 200, height: 200 }}
                  resizeMode="contain"
              />
              <Text style={styles.bodyText}>You have no tasks!</Text>
              </View>
              :
            todosList.map((todo) => (
              <TodoItem
                key={todo.id}
                title={todo.title}
                isDone={todo.isDone}
                onToggle={() => updateTaskStatus(todo.id)}
                onDelete={() => deleteTask(todo.id)}
                onEdit={() => handleEdit(todo.id)}
                isEditing={editingId === todo.id}
                onSubmitEdit={(newTitle) => handleSubmitEdit(todo.id, newTitle)}
              />
            ))
          }

        {isInputShown && <Pressable style={styles.todoItem}>
          <View style={styles.checkbox}></View>
           <TextInput
             value={text}
              placeholder="Add new task"
              returnKeyType="done"
            style={{ fontSize: 17 }}
            autoFocus={true}
             onChangeText={setText}
              onSubmitEditing={() => {
                toggleInput(false)
                setText("")
                addTask(text.trim())
              }}
           />
          </Pressable>}

          <ConfettiCannon
            ref={confettiRef}
            count={150}
            origin={{ x: 0, y: 0 }}
            autoStart={false}
            fadeOut={true}
            fallSpeed={1000}
          />

          {/* Floating action button */}
          <Fab showBttomSheet={()=> toggleInput(true)} />

          <StatusBar style="auto" />
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
