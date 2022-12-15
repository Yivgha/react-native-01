import React, { useState, useCallback } from 'react';
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import RegistrationForm from './Screens/RegistrationScreen/RegistrationScreen';
import LoginForm from './Screens/LoginScreen/LoginScreen';

import {
  StyleSheet, View, ImageBackground, TouchableWithoutFeedback, Keyboard, Text
} from 'react-native';

SplashScreen.preventAutoHideAsync();

const bgImg = require("./assets/images/bg-img-1x.jpg");

export default function App() {

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(true);
    Keyboard.dismiss();
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  
  return (
    <TouchableWithoutFeedback onPress={keyboardHide} isShowKeyboard={isShowKeyboard} onLayout={onLayoutRootView}>
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
