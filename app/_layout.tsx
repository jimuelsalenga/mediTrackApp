import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync("white");
      NavigationBar.setButtonStyleAsync("dark");
    }
    SplashScreen.hideAsync();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}