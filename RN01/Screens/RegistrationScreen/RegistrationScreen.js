import {
    StyleSheet, View, Image, Text, TextInput, TouchableOpacity,
    KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback
} from 'react-native';
import React, { useCallback, useState } from 'react';

const noAvatar = require("../../assets/images/no-avatar-1x.png");

export default function RegistrationForm() {
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [isShown, setIsShown] = useState(true);

    const keyboardHide = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
    }

 

    return (
    <TouchableWithoutFeedback onPress={keyboardHide} onClick={keyboardHide}>
            <View style={{ ...styles.formWrapper, paddingBottom: isShowKeyboard ? 0 : 45 }}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View style={{ ...styles.formWithAvatar, marginBottom: isShowKeyboard ? 0 : 16 }} >
                    <Image source={noAvatar} style={styles.noAvatar} />
                    <Text style={styles.title}>Registration</Text>
                    <TextInput placeholder="Login" value={login} style={styles.formInput}
                        onChangeText={text => setLogin(text)}
                        onFocus={() => { setIsShowKeyboard(true) }} />
                    <TextInput placeholder="E-mail" value={email} style={styles.formInput}
                        onChangeText={text => setEmail(text)}
                        onFocus={() => { setIsShowKeyboard(true) }} />
            
                    <TextInput
                        placeholder="Password"
                        style={styles.formInput}
                        autoCorrect={false}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        enablesReturnKeyAutomatically
                        onFocus={() => {setIsShowKeyboard(true)}}
                    />
                </View>
                </KeyboardAvoidingView>
                {!isShowKeyboard &&
                    (<View isShown={isShown}>
                <TouchableOpacity activeOpacity={0.8} style={{ ...styles.formBtn}} onPress={keyboardHide}>
                <Text  style={styles.formBtnText}>Register now</Text>
            </TouchableOpacity>
                    <Text style={styles.formText}>Do you have an account already? Log in</Text>
                    </View>)}
                
        </View>
   </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    formWrapper: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 549,
    paddingHorizontal: 16,
    justifyContent: "flex-end",
    },
    formWithAvatar: {
        marginBottom: 0,
        backgroundColor: "transparent"
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
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    color: "#212121",
    textAlign: "center",
    lineHeight: 35,
      letterSpacing: 0.01,
    marginBottom: 32,
    },
    formInput: {
        backgroundColor: "#F6F6F6",
        color: "#BDBDBD",
        fontSize: 16,
        lineHeight: 19,
        borderColor: "#E8E8E8",
        borderRadius: 8,
        marginBottom: 16,
        padding: 16,
    },
    placeholder: {
        textAlign: "right",
        color: "#1B4371",
        justifyContent: "flex-end",
    },
    formBtn: {
        backgroundColor: "#FF6C00",
        borderRadius: 100,
        height: 51,
        padding: 16,
        marginBottom: 16,
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
    }
})

