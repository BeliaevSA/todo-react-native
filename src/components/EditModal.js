import { useState } from "react";
import { View, StyleSheet, TextInput, Modal, Alert } from "react-native";
import { THEME } from "../theme";
import { AppButton } from "./ui/AppButton";

export const EditModal = ({ visible, onCancel, value, onSave }) => {
  const [title, setTitle] = useState(value)

  const saveHandler = () => {
    if(title.trim().length < 3) {
      Alert.alert(
        'Ошибка!', 
        `Минимальная длина названия 3 символа. Сейчас ${title.trim().length} символ(а)`
      )
    } else {
      onSave(title)
    }
    
  }

  const cancelHHandler = () => {
    setTitle(value),
    onCancel()
  }

  return (
    <Modal 
      animationType="slide"
      transparent={false}
      visible={visible}
    >
      <View style={styles.wrap}>
        <TextInput 
          value={title}
          onChangeText={setTitle}
          style={styles.input} 
          placeholder='Введите название' 
          autoCapitalize="none" 
          autoCorrect={false}
          maxLength={64}
        />
        <View style={styles.buttons}>
          <AppButton onPress={cancelHHandler} color={THEME.DANGER_COLOR}>Отменить</AppButton>
          <AppButton onPress={saveHandler}>Сохранить</AppButton>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%'
  },
  buttons: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})