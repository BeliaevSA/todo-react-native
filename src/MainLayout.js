import React, { useContext } from "react";
import { View, StyleSheet, Alert } from "react-native";

import { Navbar } from "./components/Navbar";
import { THEME } from "./theme";
import { MainScreen } from "./screens/MainScreen";
import { TodoScreen } from "./screens/TodoScreen"
import { ScreenContext } from "./context/screen/screenContext";

export const MainLayout = ({onLayoutRootView}) => {
  const { todoId } = useContext(ScreenContext)
  
  return (
    <View style={styles.wrapper} onLayout={onLayoutRootView}>
      <Navbar title='Todo app'/>
      <View style={styles.container}>
        { todoId ? <TodoScreen /> : <MainScreen /> }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    flex: 1
  },
  wrapper: {
    flex: 1
  }
});


 // const addTodo = (title) => {
  //   setTodos(prevTodos => [
  //     ...prevTodos,
  //     {
  //       id: Date.now().toString(),
  //       title
  //     }
  //   ])
  // }

  // const removeTodo = (id) => {
  //   const todo = todos.find(item => item.id === id)

  //   Alert.alert(
  //     "Удаление элемента",
  //     `Вы уверены, что хотите удалить "${todo.title}"?`,
  //     [
  //       {
  //         text: "Отмена",
  //         style: "cancel"
  //       },
  //       { 
  //         text: "Удалить", 
  //         style: 'destructive',
  //         onPress: () => {
  //           setTodoId(null)
  //           setTodos(prev => prev.filter(item => item.id !== id))
  //         }
  //       }
  //     ],
  //     {cancelable: false}
  //   )
    
  // }

  // const updateTodo = (id, title) => {
  //   setTodos(prev => prev.map(todo => {
  //     if(todo.id === id) {
  //       todo.title = title
  //     }
  //     return todo
  //   }))
  // }

// const [todos, setTodos] = useState([])
  // const [todoId, setTodoId] = useState(null)

// <MainScreen 
    //   todos={todos} 
    //   addTodo={addTodo} 
    //   removeTodo={removeTodo} 
    //   openTodo={changeScreen}/>
    //   // openTodo={(id) => setTodoId(id)}/>

{/* <TodoScreen 
        todo={selectedTodo}
        onRemove={removeTodo}
        goBack={() => changeScreen(null)}
        onSave={updateTodo}
      /> */}