import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../components/screens/Login";
import Signup from "../components/screens/Signup";
import ForgetPassword from "../components/screens/ForgetPassword";
import Home from "../components/screens/Home";

const Stack = createNativeStackNavigator()
const AuthNavigator = () =>{
    return <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='ForgetPassword' component={ForgetPassword} />
    </Stack.Navigator>
}



export default AuthNavigator;