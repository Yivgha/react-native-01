import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';

const noAvatar = require("../../assets/images/no-avatar-1x.png");

export default function RegistrationForm() {
    const [password, setPassword] = useState('');

    return (
        <View style={styles.formWrapper}>
            <Image source={noAvatar} style={styles.noAvatar} />
            <Text style={styles.title}>Registration</Text>
            <View style={styles.formFields}>
                <TextInput placeholder="Login" style={styles.formInput}></TextInput>
                <TextInput placeholder="E-mail" style={styles.formInput}></TextInput>
                <View>
                    <TextInput
                        placeholder="Password"
                        style={styles.formInput}
                        autoCorrect={false}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        enablesReturnKeyAutomatically
                    />
                    {/* <Pressable onPress={handlePasswordVisibility}>
                            <Text value={rightText} style={styles.placeholder}></Text>
                    </Pressable> */}
                </View>

                <TouchableOpacity style={styles.formBtn}>
                    <Text style={styles.formBtnText}>Register now</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.formText}>Do you have an account already? Log in</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    formWrapper: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 549,
    paddingHorizontal: 16,
  },
  noAvatar: {
    width: 120,
    height: 120,
    background: "#F6F6F6",
    borderRadius: 16,
    paddingBottom: 32,
    alignSelf: "center",
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    color: "#212121",
    textAlign: "center",
    lineHeight: 35,
    letterSpacing: 0.01,
      marginTop: 20,
    paddingBottom: 33,
    },
    formFields: {
        justifyContent: "center",
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
        marginTop: 16,
        paddingHorizontal: 20,
    }
})

