import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useState, useCallback } from 'react';

import RegistrationForm from './Screens/RegistrationScreen/RegistrationScreen';

SplashScreen.preventAutoHideAsync();

const bgImg = require("./assets/images/bg-img-1x.jpg");

export default function App() {
  const [fontsLoaded] = useFonts({
  "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
  "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  };
  
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ImageBackground source={bgImg} style={styles.image}>
        <RegistrationForm />
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: "Roboto-Regular",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    paddingTop: 235,
  },
});
