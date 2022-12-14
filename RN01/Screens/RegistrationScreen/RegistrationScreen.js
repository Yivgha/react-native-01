import {
    StyleSheet, View, Image, Text, TextInput, TouchableOpacity,
    KeyboardAvoidingView, Platform, Keyboard
} from 'react-native';
import React, { useState } from 'react';
import PasswordInput from '../../components/common/Input';
import AvatarInput from "../../components/common/Avatar";
import { useKeyboardStatus } from "../../hooks/isOpen";

const noAvatar = require("../../assets/images/no-avatar-1x.png");

const initialState = {
  login: "",
  email: "",
  password: "",
}

export default function RegistrationForm() {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const isOpen = useKeyboardStatus(true);
    const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [state, setState] = useState(initialState);
  
  const submitForm = () => {
    setIsShowKeyboard(true);
    Keyboard.dismiss();
    console.log(JSON.stringify(state));
    setState(initialState);
  }

    return (
       <View style={styles.form}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            
              <AvatarInput />
              
              <Text style={styles.title}>Registration</Text>

              <TextInput style={{ ...styles.input, marginBottom: 16 }} 
                value={state.login}
                textAlign={"left"} placeholder="Login" placeholderTextColor={"#BDBDBD"}
                onChangeText={value => setState((prevState) => ({ ...prevState, login: value }))}
              />
              <TextInput style={{ ...styles.input, marginBottom: 16 }} 
                 value={state.email}
                textAlign={"left"} placeholder="Email" placeholderTextColor={"#BDBDBD"}
              onChangeText={value => setState((prevState) => ({...prevState, email: value}))}
              />
              <PasswordInput
                 value={state.password}
                placeholder="Password"
                 icon={<TouchableOpacity onPress={() => setIsSecureEntry(prev => !prev)}>
                    <Text style={{ color: "#000000" }}>{isSecureEntry ? "Show" : "Hide"}</Text>
                   </TouchableOpacity>}
                 iconPosition="right"
                        autoCorrect={false}
                        secureTextEntry={isSecureEntry}
                        onChangeText={value => setState((prevState) => ({...prevState, password: value}))}
                        enablesReturnKeyAutomatically
                        onFocus={() => {setIsShowKeyboard(false)}}
                    />
           
        </KeyboardAvoidingView>

            {!isOpen && ( <View >
              <TouchableOpacity activeOpacity={0.8} style={{ ...styles.formBtn}} onPress={submitForm}>
                <Text  style={styles.formBtnText}>Register now</Text>
            </TouchableOpacity>
                    <Text style={styles.formText}>Do you have an account already? Log in</Text>
            </View>)}
             </View>
    )
};


const styles = StyleSheet.create({
  form: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
  }, 
  input: {
    borderWidth: 1,
    borderColor: "#f0f8ff",
    height: 50,
    padding: 16,
    borderRadius: 6,
    color: "fff",
  },
  title: {
    fontSize: 30,
    color: "#212121",
    textAlign: "center",
    lineHeight: 35,
    letterSpacing: 0.01,
    marginTop: -30,
    marginBottom: 32,
    },
  formBtn: {
        backgroundColor: "#FF6C00",
        borderRadius: 100,
        height: 50,
        padding: 16,
    marginBottom: 16,
    marginTop: 24,
    },
    formBtnText: {
        color: "#fff",
        fontSize: 16,
        lineHeight: 19,
      textAlign: "center",

    },
    formText: {
        color: "#1B4371",
        fontSize: 16,
        lineHeight: 19,
      paddingHorizontal: 20,
        marginBottom: 45,
    }
})

