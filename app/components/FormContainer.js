import React from "react";
import {StyleSheet, KeyboardAvoidingView, Image, Dimensions, ScrollView} from 'react-native';

const FormContainer = ({children}) =>{
    return (
        <KeyboardAvoidingView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <Image style={styles.logo} source={require('../assets/logo2.png')} />
           {children}
        </ScrollView>
      </KeyboardAvoidingView>
    )
}

const {height} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    height: 125,
    width: 125,
    marginTop: height*0.1,
    marginBottom: 20,
    alignSelf: 'center'
  },
})

export default FormContainer;