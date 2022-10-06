import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, FlatList, StyleSheet, Image, Dimensions } from "react-native";

import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";
import { AppButton } from "../components/ui/AppButton";
import { AppLoader } from "../components/ui/AppLoader";
import { AppText } from "../components/ui/AppText";
import { ScreenContext } from "../context/screen/screenContext";
import { TodoContext } from "../context/todo/todoContext";
import { THEME } from "../theme";

export const MainScreen = () => {
  const {todos, addTodo, removeTodo, fetchTodos, loading, error} = useContext(TodoContext)
  const {changeScreen} = useContext(ScreenContext)
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
  )

  const loadTodos = useCallback(() => fetchTodos(), [fetchTodos])

  useEffect(() => {
    loadTodos()
  }, [])

  useEffect(() => {
    const update = () => {
      const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
      setDeviceWidth(width)
    }
    Dimensions.addEventListener('change', update)

    return () => {
      Dimensions.addEventListener('change', update)?.remove()
    }
  })

  if(loading){
    return <AppLoader />
  }

  if(error){
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onPress={loadTodos}>Повторить</AppButton>
      </View>
    )
  }

  let content = (
    <View style={{width: deviceWidth}}>
      <FlatList 
        data={todos} 
        renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen}/>} 
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
  
  if (todos.length === 0) {
    content = (
      <View style={styles.imgWrap}>
        <Image source={require('../../assets/react.png')} style={styles.image}/>
        {/* <Image 
          source={{ uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png' }} 
          style={styles.image}
        /> */}
      </View>
    )
  }
  
  return (
    <View style={styles.wrapper}>
      <AddTodo onSubmit={addTodo} />

      { content }
        
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 350,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR
  }
})