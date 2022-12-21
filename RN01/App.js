import React, { useCallback } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import useRoute from './src/router/router'

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

    const routing = useRoute(true)

    return (
        <NavigationContainer onLayout={onLayoutRootView}>
            {routing}
        </NavigationContainer>
    )
}
