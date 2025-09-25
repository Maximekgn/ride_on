import {  DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "./global.css";
import { useIsFirstOpen } from "@/store/general";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";

// Bloquer le splash screen au démarrage
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const isFirstOpen = useIsFirstOpen();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Timer pour laisser le splash quelques secondes
    const timer = setTimeout(async () => {
      setReady(true);
      await SplashScreen.hideAsync(); // cacher le splash
    }, 3000); // 3000ms = 3 secondes

    return () => clearTimeout(timer);
  }, []);

  if (!ready) {
    // On ne rend rien tant que le splash est visible
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        {isFirstOpen ? (
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            
          </>
        )}
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
