import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Button } from 'react-native'
import RegistrationForm from '../Screens/auth/RegistrationScreen/RegistrationScreen'
import LoginForm from '../Screens/auth/LoginScreen/LoginScreen'
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
    }
    return (
        <AuthStack.Navigator initialRouteName="Home">
            <AuthStack.Screen
                options={{ headerShown: false }}
                name="Home"
                component={HomeScreen}
            />
        </AuthStack.Navigator>
    )
}

export default useRoute
