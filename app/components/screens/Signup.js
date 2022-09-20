import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import FormContainer from '../FormContainer';
import AppInput from '../AppInput';
import SubmitButton from '../SubmitButton';
import FormNavigator from '../FormNavigator';
import { useNavigation } from '@react-navigation/native';
import { navigateToLogin, navigationToForgetPassword, updateNotification } from '../../utils/helper';

import { Formik } from 'formik';
import * as Yup from 'yup';
import client from '../../api/client';
import { signup } from '../../utils/auth';
import AppNotification from '../AppNotification';

const initialValues = {
    name: '',
    email: '',
    password: ''
}

const validationSchema = Yup.object({
    name: Yup.string().trim().required('Name is missing!'),
    email: Yup.string().email('Invalid email').required('Email is missing!'),
    password: Yup.string().trim().min(6, 'Password is too short').required('Password is missing!')
})

const Signup = () =>{
    const navigation = useNavigation()
    const [message, setMessage] = useState({
        text: '',
        type: ''
    })
    
    const handleSignup = async(values, formikActions)=>{
        const res = await signup(values)
        formikActions.setSubmitting(false)

        if(!res.success) return updateNotification(setMessage, res.error);
        formikActions.resetForm();
        console.log(res)
    }
    return (
        <>
        {message.text ? (<AppNotification type={message.type} text={message.text} />):null}
        <FormContainer>
            <Formik
             initialValues={initialValues}
             validationSchema={validationSchema}
             onSubmit={handleSignup}
            >
                {({errors, values,touched, handleSubmit,handleBlur, handleChange})=>{
                    return (
                    <>
                    <Text style={{color: 'red', paddingVertical: 3}}>{touched.name && errors.name ? errors.name:''}</Text>
                    <AppInput onChangeText={handleChange('name')} onBlur={handleBlur('name')} placeholder="John Doe" />
                    <Text style={{color: 'red', paddingVertical: 3}}>{touched.email && errors.email ? errors.email:''}</Text>
                    <AppInput onChangeText={handleChange('email')} onBlur={handleBlur('email')} placeholder="example@email.com" />
                    <Text style={{color: 'red', paddingVertical: 3}}>{touched.password && errors.password ? errors.password:''}</Text>
                    <AppInput secureTextEntry onChangeText={handleChange('password')} onBlur={handleBlur('password')} placeholder="**********" />
                    <SubmitButton onPress={handleSubmit} title='Sign up' />
                    <FormNavigator onLeftLinkPress={navigateToLogin(navigation)} onRightLinkPress={navigationToForgetPassword(navigation)} leftLinkText='Login' rightLinkText='Forget password' /></>)}}
            </Formik>
        </FormContainer>
        </>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default Signup;