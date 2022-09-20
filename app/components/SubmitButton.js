import React from "react";
import { StyleSheet, Pressable, Text, Dimensions } from "react-native";

const SubmitButton = ({title, onPress}) =>{
    return (
        <Pressable onPress={onPress} style={styles.submit}>
            <Text style={styles.btnText}>{title}</Text>
        </Pressable>
    )
}

const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  btnText: {
    fontSize: 20,
    color: '#fff',
    marginLeft: 140
  },
  linkText: {
    fontSize: 16,
    color: '#8469cf',
  },
  submit: {
    height: 50,
    width: width - 50,
    backgroundColor: '#8469cf',
    borderRadius: 8,
    justifyContent: 'center'
  }
})


export default SubmitButton;