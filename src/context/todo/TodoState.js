import React, {useReducer, useContext} from "react";
import { Alert } from "react-native";
import { Http } from "../../http";
import { ScreenContext } from "../screen/screenContext";
import { ADD_TODO, CLEAR_ERROR, FETCH_TODOS, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO } from "../types";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  }

  const {changeScreen} = useContext(ScreenContext)

  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = async title => {
    // const response = await fetch('https://rn-todo-app-93d27-default-rtdb.firebaseio.com/todos.json',{
    //   method: 'POST',
    //   headers:  {'Content-Type': 'application/json'},
    //   body: JSON.stringify({title})
    // })
    // const data = await response.json()
    try {
      const data = await Http.post(
      'https://rn-todo-app-93d27-default-rtdb.firebaseio.com/todos.json', 
      {title}
    )
    dispatch({type: ADD_TODO, title, id: data.name})
    } catch (e) {
      showError('Что-то пошло не так...')
    }
    
  }

  const removeTodo = id => {
    const todo = state.todos.find(todo => todo.id === id )
    Alert.alert(
      "Удаление элемента",
      `Вы уверены, что хотите удалить "${todo.title}"?`,
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        { 
          text: "Удалить", 
          style: 'destructive',
          onPress: async () => {
            changeScreen(null)
            // await fetch(`https://rn-todo-app-93d27-default-rtdb.firebaseio.com/todos/${id}.json`, {
            //   method: 'DELETE', 
            //   headers: {
            //     'Content-Type': 'application/json'
            //   }
            // })
            await Http.delete(`https://rn-todo-app-93d27-default-rtdb.firebaseio.com/todos/${id}.json`)
            dispatch({type: REMOVE_TODO, id})
          }
        }
      ],
      {cancelable: false}
    )
  }

  const fetchTodos = async () => {
    showLoader()
    clearError()
    try{
      // const response = await fetch(
      //   'https://rn-todo-app-93d27-default-rtdb.firebaseio.com/todos.json', 
      //   {
      //     method: 'GET',
      //     headers: {'Content-Type': 'application/json'}
      //   }
      // )
      // const data = await response.json()
      const data = await Http.get('https://rn-todo-app-93d27-default-rtdb.firebaseio.com/todos.json')
      const todos = data ? Object.keys(data).map(key => ({...data[key], id:key})) : []
      dispatch({type: FETCH_TODOS, todos})
    } catch (e) {
      showError('Что-то пошло не так...')
      console.log(e)
    } finally {
      hideLoader()
    }
  }

  const updateTodo = async (id, title) => {
    clearError()
    try{
      // await fetch(`https://rn-todo-app-93d27-default-rtdb.firebaseio.com/todos/${id}.json`, {
      //   method: 'PATCH',
      //   header: {'Content-Type': 'application/json'},
      //   body: JSON.stringify({title})
      // })
      await Http.patch(`https://rn-todo-app-93d27-default-rtdb.firebaseio.com/todos/${id}.json`, {title})
      dispatch({type: UPDATE_TODO, id, title})
    } catch (e) {
      showError('Что-то пошло не так...')
      console.log(e)
    }
    
  }

  const showLoader = () => dispatch({type: SHOW_LOADER})

  const hideLoader = () => dispatch({type: HIDE_LOADER})

  const clearError = () => dispatch({type: CLEAR_ERROR})

  const showError = error => dispatch({type: SHOW_ERROR, error})

  return (
    <TodoContext.Provider 
      value={{ 
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
        showError,
        clearError
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}