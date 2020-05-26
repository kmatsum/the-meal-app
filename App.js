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
//React-Redux
import { Provider } from 'react-redux';
//Redux Imports
import { createStore, combineReducers } from 'redux';
//Redux Reducer Imports
import mealsReducer from './redux/reducer/meals';
//App Loading Imports as well as Fonts
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

//[Module 120]: Enable usage of Screens
enableScreens();

/* [Module 146]: Redux:
  Redux is an App-wide state management tool which helps to provide state to the entire application (even all the sub-components).
  To use Redux, we need 'actions' and 'reducers'. A single applicaiton will use a SINGLE redux reducer to update the state of the
  app.
  Below, we can create a 'rootReducer' with the 'combineReducers()' which takes a JavaScript Object, which has KEY VALUE PAIRS that
  match to other reducers that we use. We can then use 'rootReducer' as the overall APPLICAITON REDUCER that we will globally use. */
const rootReducer = combineReducers({
  meals: mealsReducer,

});
/* [Module 146]: To create a store (The main place where redux looks for information), create a variable (to reference) with
  'createStore()' which takes a Reducer as a parameter. Since it will only take one, in this case, we combined reducers into 1 to
  create a single 'rootReducer' that will be used as the overall APPLICATION REDUCER. */
const store = createStore(rootReducer);

//[Module 108]: Setup usage of fonts throughout the project
function fetchFonts() {
  console.log('Fonts Loading...')
  return Font.loadAsync({
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
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
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
