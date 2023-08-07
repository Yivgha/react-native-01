import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import RegistrationForm from '../Screens/authScreens/RegistrationScreen/RegistrationScreen'
import LoginForm from '../Screens/authScreens/LoginScreen/LoginScreen'
import HomeScreen from '../Screens/Home/HomeScreen'

const AuthStack = createStackNavigator()

const useRoute = (isAuth) => {
    if (!isAuth) {
        return (
            <AuthStack.Navigator initialRouteName="Register">
                <AuthStack.Screen
                    options={{ headerShown: false }}
                    name="Register"
                    component={RegistrationForm}
                />
                <AuthStack.Screen
                    options={{ headerShown: false }}
                    name="Login"
                    component={LoginForm}
                />
            </AuthStack.Navigator>
        )
    } else {
        return (
            <AuthStack.Navigator>
                <AuthStack.Screen
                    options={{ headerShown: false }}
                    name="Home"
                    component={HomeScreen}
                />
            </AuthStack.Navigator>
        )
    }
}

export default useRoute
