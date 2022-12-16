import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Dimensions,
} from 'react-native'
import React, { useState } from 'react'
import PasswordInput from '../../components/common/Input'
import CustomInput from '../../components/common/CustomTextInput'
import { useKeyboardStatus } from '../../hooks/isOpen'
import { useOrientation } from '../../hooks/screenOrientation'

const units = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

const initialState = {
    email: '',
    password: '',
}

export default function LoginForm() {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false)
    const isOpen = useKeyboardStatus(true)
    const [isSecureEntry, setIsSecureEntry] = useState(true)
    const [state, setState] = useState(initialState)

    const submitForm = () => {
        setIsShowKeyboard(true)
        Keyboard.dismiss()
        console.log(JSON.stringify(state))
        setState(initialState)
    }
    const orientation = useOrientation()
    return (
        <View
            style={[
                styles.form,
                {
                    width:
                        orientation === 'PORTRAIT'
                            ? units.width / 1
                            : units.height / 1,
                },
            ]}
            isShowKeyboard={isShowKeyboard}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <Text style={styles.title}>Login</Text>

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
                        <Text style={styles.formBtnText}>Register now</Text>
                    </TouchableOpacity>
                    <Text style={styles.formText}>
                        Do you have an account already? Log in
                    </Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 16,
        paddingTop: 32,
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
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 111,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
    },
})
