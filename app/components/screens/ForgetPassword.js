import React, {useState} from "react";
import {StyleSheet, Text} from 'react-native'
import AppInput from "../AppInput";
import FormContainer from "../FormContainer";
import SubmitButton from "../SubmitButton";
import FormNavigator from "../FormNavigator";
import { useNavigation } from "@react-navigation/native";
import { navigateToLogin, navigateToSignup, updateNotification } from "../../utils/helper";

import { Formik } from 'formik';
import * as Yup from 'yup';
import { forgetPassword } from "../../utils/auth";
import AppNotification from "../AppNotification";

const initialValues = {
    email: '',
}

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is missing!'),
})

const ForgetPassword = () =>{
    const navigation = useNavigation()
    const [message, setMessage] = useState({
        text: '',
        type: ''
    })
    
    const handleResetLink = async (values, formikActions)=>{
        const res = await forgetPassword(values.email)
        formikActions.setSubmitting(false)

        if(!res.success) return updateNotification(setMessage, res.error);
        formikActions.resetForm();
        updateNotification(setMessage, res.message, 'success');
     }

    return <>{message.text ? (<AppNotification type={message.type} text={message.text} />):null}<FormContainer>
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleResetLink}
        >
        {({errors, values,touched, handleSubmit,handleBlur, handleChange})=>{
            return (
            <>
              <Text style={{color: 'red', paddingVertical: 3}}>{touched.email && errors.email ? errors.email:''}</Text>
              <AppInput onChangeText={handleChange('email')} onBlur={handleBlur('email')} placeholder="example@email.com" />
              <SubmitButton onPress={handleSubmit} title='Send Link' />
              <FormNavigator onLeftLinkPress={navigateToLogin(navigation)} onRightLinkPress={navigateToSignup(navigation)} leftLinkText='Login' rightLinkText='Signup' />
            </>
        )}}
        </Formik>
    </FormContainer>
    </>
}

const styles = StyleSheet.create({
    container: {},
})

export default ForgetPassword;