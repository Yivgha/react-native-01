import * as firebase from 'firebase/app'
import { getReactNativePersistence, initializeAuth } from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyBhk_H0_C_XKDMpRaoKy9aXAaNTP3k_iW8',
    authDomain: 'rn01-fe0d5.firebaseapp.com',
    projectId: 'rn01-fe0d5',
    storageBucket: 'rn01-fe0d5.appspot.com',
    messagingSenderId: '650244899589',
    appId: '1:650244899589:web:9f5c74f84b0b3847cb2d6c',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})

export default { firebaseApp, auth }
