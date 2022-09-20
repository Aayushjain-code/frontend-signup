import React, {useState} from 'react';
import { StyleSheet, Text } from 'react-native';
import FormContainer from '../FormContainer';
import AppInput from '../AppInput';
import SubmitButton from '../SubmitButton';
import FormNavigator from '../FormNavigator';
import { useNavigation } from '@react-navigation/native';
import { navigateToHome, navigateToSignup, navigationToForgetPassword, updateNotification } from '../../utils/helper';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { signin } from '../../utils/auth';
import AppNotification from '../AppNotification';

const initialValues = {
    email: '',
    password: ''
}

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is missing!'),
    password: Yup.string().trim().min(6, 'Password is too short').required('Password is missing!')
})
const Login = () =>{
    const navigation = useNavigation()
    const [message, setMessage] = useState({
        text: '',
        type: ''
    })

    const handleLogin = async(values, formikActions)=>{
        const res = await signin(values)
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
             onSubmit={handleLogin }
            >
            {({errors, values,touched, handleSubmit,handleBlur, handleChange})=>{
                return (
                <>
                <Text style={{color: 'red', paddingVertical: 3}}>{touched.email && errors.email ? errors.email:''}</Text>
                <AppInput onChangeText={handleChange('email')} onBlur={handleBlur('email')} placeholder="example@email.com" />
                <Text style={{color: 'red', paddingVertical: 3}}>{touched.password && errors.password ? errors.password:''}</Text>
                <AppInput secureTextEntry  onChangeText={handleChange('password')} onBlur={handleBlur('password')} placeholder="**********" />
                <SubmitButton onPress={handleSubmit} title='Login' />
                <FormNavigator onLeftLinkPress={navigateToSignup(navigation)} onRightLinkPress={navigationToForgetPassword(navigation)} leftLinkText='Sign up' rightLinkText='Forget password' /></>
            )}}
            </Formik>
        </FormContainer>
        </>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default Login;