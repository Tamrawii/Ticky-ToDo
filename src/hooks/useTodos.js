import { useState, useCallback } from "react";

const initialTodos = [
  {
    id: 1,
    title: "Check my work email",
    isDone: false,
  },
  {
    id: 2,
    title: "Review pull requests and code reviews",
    isDone: true,
  },
  {
    id: 3,
    title: "Attend daily team standup",
    isDone: false,
  },
  {
    id: 4,
    title: "Draft project status report",
    isDone: false,
  },
  {
    id: 5,
    title: "Clear desktop downloads folder",
    isDone: true,
  },
  {
    id: 6,
    title: "Schedule 1-on-1 with manager",
    isDone: false,
  },
  {
    id: 7,
    title: "Plan priorities for tomorrow",
    isDone: false,
  },
];

export const useTodos = () => {
  const [todosList, setTodosList] = useState(initialTodos);

  var totalTasks = todosList.length
  var doneTasks = todosList.filter((task) => task.isDone).length

  const calculateDoneTasks = () => {
    return initialTodos.length - initialTodos.filter((todo) => !todo.isDone).length
  }

  const addTask = (title) =>
  {
    setTodosList((prev) => (title != "") ? [...prev, {
    id: Date.now(),
    title: title,
    isDone: false,
    }] : prev)
    totalTasks = todosList.length
  }

  const updateTaskStatus = (id) =>
  {
    setTodosList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      ),
    );
    doneTasks = todosList.filter((task) => task.isDone).length
  }

  const editTask = (id, newTitle) =>
  {
    setTodosList((prev) =>
      newTitle.trim() === "" ? prev :
      prev.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle.trim() } : todo
      ),
    );
}

  const deleteTask = (id) =>
  {
    setTodosList((prev) =>
      prev.filter((task) => task.id !== id)
    );
    totalTasks = todosList.length
    doneTasks = todosList.filter((task) => task.isDone).length
  }

  return { todosList, addTask, updateTaskStatus, editTask, deleteTask, totalTasks, doneTasks, setTodosList };
};
