import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useState, useCallback } from 'react';

SplashScreen.preventAutoHideAsync();

const bgImg = require("./assets/images/bg-img-1x.jpg");
const noAvatar = require("./assets/images/no-avatar-1x.png");


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
        <View style={styles.formWrapper}>
          <Image source={noAvatar} style={styles.noAvatar} />
          <Text style={styles.title}>Registration</Text>
          </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    fontFamily: "Roboto-Regular",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    paddingTop: 235,
  },
  formWrapper: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 549,
  },
  noAvatar: {
    width: 120,
    height: 120,
    background: "#F6F6F6",
    borderRadius: 16,
    paddingBottom: 32,
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    color: "#212121",
    textAlign: "center",
    lineHeight: 35,
    letterSpacing: 0.01,
    marginTop: 92,
  },

});
