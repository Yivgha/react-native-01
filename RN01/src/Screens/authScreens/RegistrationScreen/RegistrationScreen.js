import React, { useState } from 'react'
import {
    StyleSheet,
    TouchableWithoutFeedback,
    ImageBackground,
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Dimensions,
} from 'react-native'

import PasswordInput from '../../../components/common/Input'
import AvatarInput from '../../../components/common/Avatar'
import CustomInput from '../../../components/common/CustomTextInput'
import { useKeyboardStatus } from '../../../hooks/isOpen'
import { useDispatch } from 'react-redux'
import { authSignUpUser } from "../../../redux/auth/authOperations"
import db from '../../../firebase/firebaseConfig'

const units = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

const initialState = {
    nickname: '',
    email: '',
    password: '',
}
const bgImg = require('../../../../assets/images/bg-img-1x.jpg')



export default function RegistrationForm({ navigation }) {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false)
    const isOpen = useKeyboardStatus(true)
    const [isSecureEntry, setIsSecureEntry] = useState(true)
    const [state, setState] = useState(initialState)

    const dispatch = useDispatch();

    const submitForm = () => {
        setIsShowKeyboard(true)
        Keyboard.dismiss()
        console.log("state:", JSON.stringify(state))

        dispatch(authSignUpUser(state))
        setState(initialState)
    }

    const keyboardHide = () => {
        setIsShowKeyboard(true)
        Keyboard.dismiss()
    }

    return (
        <TouchableWithoutFeedback
            onPress={keyboardHide}
            isShowKeyboard={isShowKeyboard}
        >
            <View style={styles.container}>
                <ImageBackground source={bgImg} style={styles.image}>
                    <View style={[styles.form]} isShowKeyboard={isShowKeyboard}>
                        <KeyboardAvoidingView
                            behavior={
                                Platform.OS === 'ios' ? 'padding' : 'height'
                            }
                        >
                            <AvatarInput
                                value={state.photo}
                                onChange={(value) => {
                                    setState((prevState) => ({
                                        ...prevState,
                                        photo: value,
                                    }))
                                }}
                            />
                            <Text style={styles.title}>Registration</Text>
                            <CustomInput
                                value={state.nickname}
                                placeholder="Nickname"
                                placeholderTextColor={'#BDBDBD'}
                                onChangeText={(value) => {
                                    setState((prevState) => ({
                                        ...prevState,
                                        nickname: value,
                                    }))
                                }}
                            />

                            <CustomInput
                                value={state.email}
                                placeholder="Email"
                                placeholderTextColor={'#BDBDBD'}
                                onChangeText={(value) => {
                                    setState((prevState) => ({
                                        ...prevState,
                                        email: value,
                                    }))
                                }}
                            />

                            <PasswordInput
                                value={state.password}
                                placeholder="Password"
                                placeholderTextColor={'#BDBDBD'}
                                autoCorrect={false}
                                secureTextEntry={isSecureEntry}
                                icon={
                                    <TouchableOpacity
                                        onPress={() => {
                                            setIsSecureEntry((prev) => !prev)
                                        }}
                                    >
                                        <Text style={styles.iconText}>
                                            {isSecureEntry ? 'Show' : 'Hide'}
                                        </Text>
                                    </TouchableOpacity>
                                }
                                iconPosition="right"
                                onChangeText={(value) =>
                                    setState((prevState) => ({
                                        ...prevState,
                                        password: value,
                                    }))
                                }
                                enablesReturnKeyAutomatically
                                onFocus={() => {
                                    setIsShowKeyboard(false)
                                }}
                            />
                        </KeyboardAvoidingView>

                        {!isOpen && (
                            <View>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={{ ...styles.formBtn }}
                                    onPress={submitForm}
                                >
                                    <Text style={styles.formBtnText}>
                                        Register now
                                    </Text>
                                </TouchableOpacity>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.formText,
                                            { marginRight: 5 },
                                        ]}
                                    >
                                        Do you have an account already?
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate('Login')
                                        }
                                    >
                                        <Text style={styles.formText}>
                                            Log in
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: units.width / 1,
        height: units.height / 1,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
        width: units.width / 1,
        height: units.height / 1,
    },
    form: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 16,
    },
    iconText: {
        color: '#1B4371',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
    },
    title: {
        fontFamily: 'Roboto-Bold',
        fontSize: 30,
        color: '#212121',
        textAlign: 'center',
        lineHeight: 35,
        letterSpacing: 0.01,
        marginTop: -30,
        marginBottom: 32,
    },
    formBtn: {
        backgroundColor: '#FF6C00',
        borderRadius: 100,
        height: 50,
        padding: 16,
        marginBottom: 16,
        marginTop: 16,
    },
    formBtnText: {
        color: '#ffffff',
        fontSize: 16,
        lineHeight: 19,
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
    },
    formText: {
        color: '#1B4371',
        marginBottom: 45,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
    },
})
