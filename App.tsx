import React from 'react';
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar, LogBox } from 'react-native';
import { useFonts } from 'expo-font';

// LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['You are not currently signed in to Expo on your development machine.']);
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

import { AuthProvider } from './src/hooks/auth';

import { Routes } from './src/routes';
import { Background } from './src/components/Background';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  });

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Background>
  )
}
