import {
  StyleSheet, View, ImageBackground, TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import React, { useState} from 'react';
import RegistrationForm from './Screens/RegistrationScreen/RegistrationScreen';
import LoginForm from './Screens/LoginScreen/LoginScreen';

const bgImg = require("./assets/images/bg-img-1x.jpg");

export default function App() {
  
   const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(true);
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide} isShowKeyboard={isShowKeyboard}>
      <View style={styles.container}>
        <ImageBackground source={bgImg} style={styles.image}>
          <RegistrationForm />
          {/* <LoginForm /> */}
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
});
