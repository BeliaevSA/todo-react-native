import { useFonts } from 'expo-font'
import React, { useEffect, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen'

import { TodoState } from './src/context/todo/TodoState';
import { ScreenState } from './src/context/screen/ScreenState';
import { MainLayout } from './src/MainLayout';

export default function App() {

  const [fontsLoaded] = useFonts({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScreenState>
      <TodoState>
        <MainLayout onLayoutRootView={onLayoutRootView}/>
      </TodoState>
    </ScreenState>
  ); 
}


