import React, { useEffect} from "react";
import { } from "react-native";
import {useSelector, useDispatch} from "react-redux";
import useRoute from '../router/router'
import { NavigationContainer } from '@react-navigation/native'
import {authChangeUser} from "../redux/auth/authOperations"

const Main = () => {   
    const {stateChange} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authChangeUser())
    }, []);

    const routing = useRoute(stateChange);
    
    return (
        <NavigationContainer >
            {routing}
        </NavigationContainer>
    );
}

export default Main;