import 'react-native-gesture-handler'
import React, { useEffect, useState} from "react";
import { } from "react-native";
import {useSelector, useDispatch} from "react-redux";
import useRoute from '../router/router'
import { NavigationContainer } from '@react-navigation/native'
import "firebase/compat/auth"
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Main = () => {
    const [userOn, setUserOn] = useState(null);


    const routing = useRoute(userOn);

     const authFirebase = getAuth()
    authFirebase.onAuthStateChanged((user) => { console.log("user displayName:", user.displayName); setUserOn(user) });

    
    const state = useSelector((state)=>state)
    // useEffect(()=>{}, [])
    
  return (
     <NavigationContainer >
            {routing}
    </NavigationContainer>
  )
}

export default Main;