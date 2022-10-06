import React, { useState } from "react";
import {View, StyleSheet, TextInput, Keyboard, Alert} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { THEME } from "../theme";

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState('')

  const pressHandler = () => {
    if(value.trim()){
      onSubmit(value)
      setValue('')
      Keyboard.dismiss()
    } else {
      Alert.alert('Название дела не может быть пустым')
    }
    
  }

  return (
    <View style={styles.block}>
      <TextInput 
        style={styles.textInput}
        // onChangeText={text => setValue(text)}
        onChangeText={setValue}
        value={value}
        placeholder='Введите название дела...'
        autoCorrect={false}
        autoCapitalize='none'
      />
      <AntDesign.Button onPress={pressHandler} name='pluscircleo' >Добавить</AntDesign.Button>
      {/* <Button title='Добавить' onPress={pressHandler}/> */}
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  textInput: {
    width: '60%',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: THEME.MAIN_COLOR,
    padding: 10,
  }
})