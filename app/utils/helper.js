export const navigateToSignup = navigation => ()=>{
    navigation.navigate('Signup')
}
export const navigationToForgetPassword = navigation => ()=>{
    navigation.navigate('ForgetPassword')
}

export const navigateToLogin = navigation => ()=>{
    navigation.navigate('Login')
}

export const updateNotification = (updater, text, type='error') => {
    updater({text, type});
    setTimeout(()=>{
        updater({text: '', type: ''});
    }, 2500);
}

export const navigateToHome = navigation => ()=>{
    navigation.navigate('Home')
}

