import React, { useCallback } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { LogBox } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import RegistrationForm from './src/Screens/auth/RegistrationScreen/RegistrationScreen'
import LoginForm from './src/Screens/auth/LoginScreen/LoginScreen'

LogBox.ignoreLogs(['Warning: ...'])
LogBox.ignoreAllLogs()

// SplashScreen.preventAutoHideAsync()

export default function App() {
    const [fontsLoaded] = useFonts({
        'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
    })

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync()
        }
    }, [fontsLoaded])

    if (!fontsLoaded) {
        return null
    }

    const AuthStack = createStackNavigator()

    return (
        <NavigationContainer onLayout={onLayoutRootView}>
            <AuthStack.Navigator>
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
        </NavigationContainer>
    )
}
