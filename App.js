import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';

import {AuthenticatedAppNavigator, UnauthenticatedAppNavigator} from './navigation/AppNavigator';
import {render} from "react-native-web";

const firebaseConfig = {
  apiKey: "AIzaSyAA-BBZb4GMvjbnpwlKA4qxdwAZokq696M",
  authDomain: "emma-emma.firebaseapp.com",
  databaseURL: "https://emma-emma.firebaseio.com",
  storageBucket: "emma-emma.appspot.com"
};
firebase.initializeApp(firebaseConfig);

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [patient, setPatient] = useState(null);
  console.log(patient);
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={async () => loadResourcesAsync(setPatient)}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {patient ? <AuthenticatedAppNavigator/> : <UnauthenticatedAppNavigator/>}
      </View>
    );
  }
}

async function loadResourcesAsync(setPatient) {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
      new Promise((resolve => {
        firebase.auth().onAuthStateChanged(patient => {
          if (patient) {
            setPatient(patient);
          }
          resolve();
        })
      }))
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
