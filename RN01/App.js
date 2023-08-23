import 'react-native-gesture-handler'
import React, { useCallback, useEffect } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import useRoute from './src/router/router'
import { Provider } from "react-redux"
import { store } from "./src/redux/store";
import firebase from "./src/firebase/firebaseConfig"
import "firebase/compat/auth"
import { getAuth, onAuthStateChanged} from "firebase/auth";

LogBox.ignoreLogs(['Warning: ...'])
LogBox.ignoreAllLogs()

// SplashScreen.preventAutoHideAsync()

export default function App() {

    // const [isReady, setIsReady] = React.useState(false)
    const [userOn, setUserOn] = React.useState(null);

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

 const authFirebase = getAuth()
    authFirebase.onAuthStateChanged((user) => { console.log("got user"); setUserOn(user) })
       


    const routing = useRoute(userOn)

    return (
        <Provider store={store}>
            <NavigationContainer onLayout={onLayoutRootView}>
            {routing}
            </NavigationContainer>
        </Provider>
    )
}
