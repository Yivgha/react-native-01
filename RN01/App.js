import {
  StyleSheet, View, ImageBackground, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView,
  Image, Text, TextInput, TouchableOpacity, 
} from 'react-native';

import React, { useState} from 'react';
import RegistrationForm from './Screens/RegistrationScreen/RegistrationScreen';
import Input from './components/common/Input';
import { useKeyboardStatus } from "./hooks/isOpen";

const noAvatar = require("./assets/images/no-avatar-1x.png");

const bgImg = require("./assets/images/bg-img-1x.jpg");

const initialState = {
  login: "",
  email: "",
  password: "",
}


export default function App() {
  
   const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const isOpen = useKeyboardStatus();
    const [isSecureEntry, setIsSecureEntry] = useState(true);

  
  const [state, setState] = useState(initialState);

  const keyboardHide = () => {
    setIsShowKeyboard(true);
    Keyboard.dismiss();
  }

  const submitForm = () => {
    setIsShowKeyboard(true);
    Keyboard.dismiss();
    console.log(JSON.stringify(state));
    setState(initialState);
  }
  
  return (
    <TouchableWithoutFeedback onPress={keyboardHide} isShowKeyboard={isShowKeyboard}>
      <View style={styles.container}>
        <ImageBackground source={bgImg} style={styles.image}>

            {/* <RegistrationForm />
             */}
<View style={styles.form} >
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
              <Image source={noAvatar} style={styles.noAvatar} />
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
              <Input
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
            {isShowKeyboard ? !isOpen && ( <View >
              <TouchableOpacity activeOpacity={0.8} style={{ ...styles.formBtn}} onPress={submitForm}>
                <Text  style={styles.formBtnText}>Register now</Text>
            </TouchableOpacity>
                    <Text style={styles.formText}>Do you have an account already? Log in</Text>
            </View>) : null}
             </View>
          
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
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
  noAvatar: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    marginBottom: 32,
    alignSelf: "center",
  },
  title: {
    fontSize: 30,
    color: "#212121",
    textAlign: "center",
    lineHeight: 35,
      letterSpacing: 0.01,
    marginBottom: 32,
    },
  formBtn: {
        backgroundColor: "#FF6C00",
        borderRadius: 100,
        height: 50,
        padding: 16,
    marginBottom: 16,
              // marginTop: 40,
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
});
