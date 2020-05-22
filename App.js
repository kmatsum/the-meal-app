//React Imports
import React, { useState } from 'react';
import { enableScreens } from 'react-native-screens';

//React Native Imports
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

//React Navigation Imports
import MealsNavigator from './navigation/MealsNavigator';

//App Loading Imports as well as Fonts
import { AppLoading } from 'expo';
import * as Font from 'expo-font';



//[Module 120]: Enable usage of Screens
enableScreens();

//[Module 108]: Setup usage of fonts throughout the project
function fetchFonts() {
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
}



export default function App() {
  //Variable to show if App has Loaded
  const [appLoaded, setAppLoaded] = useState(false);

  /* If the app HAS NOT loaded yet, return the Splash Screen component, then when it finishes loading,
  setAppLoaded(true) to update this component and load the actual app                               */
  if (!appLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setAppLoaded(true)} 
      />
    );
  }

  //Return the MealsNavigator component configured in MealsNavigator.js
  return (
    <MealsNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
