import React from "react";
import { StyleSheet, Dimensions, TextInput } from "react-native";

const AppInput = ({value, placeholder, onChangeText, ...rest}) => {
    
    return (
        <TextInput 
        value={value} 
        placeholder={placeholder} 
        onChangeText={onChangeText} 
        style={styles.input} {...rest} />
    )
}

const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  input: {
    width: width - 40,
    backgroundColor: '#eae9e7',
    height: 50,
    fontSize: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    color: '#8469cf',
    marginBottom: 20,
  },
})

export default AppInput;
