import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, LogBox, Keyboard } from 'react-native';
import Login from "./screens/login";
import { TabStack } from "./routes/tabStack";
import firebase from 'firebase';
import firebaseApp from "./api/firebase";
import { MenuProvider } from 'react-native-popup-menu';
import * as Font from 'expo-font'
import * as Auth from './api/auth';
import Loading from "./screens/loading";
import AppLoading from "expo-app-loading";


LogBox.ignoreLogs(["Setting a timer for a long period of", "Can't perform a React state update",
  "Failed child context type", "Failed context type"]);

const getFonts = () => {
  return Font.loadAsync({
    'lato-regular': require('./assets/fonts/Lato-Regular.ttf'),
    'lato-bold': require('./assets/fonts/Lato-Bold.ttf')
  });
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(''); // '': loading, 0: logged out, 1: logged in

  const handleLogin = async (details) => {
    Keyboard.dismiss();
    const email = details.email.toLowerCase().trim();
    const password = details.password;

    await Auth.signIn(
        { email, password },
        (user) => setLoggedIn('1'),
        (error) => Alert.alert(
            "Error",
            error.message,
            [{ text: "OK", onPress: () => console.log("OK Pressed")}]
        )
    );
  }

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setLoggedIn('1');
    } else {
      setLoggedIn('0');
    }
  })

  if (fontsLoaded) {
    if (!loggedIn) {
      return (
          <Loading/>
      );
    } else if (loggedIn === '1') {
      return (
            <MenuProvider>
              <TabStack/>
            </MenuProvider>
      );
    } else {
      return (
          <Login userDetails={handleLogin}/>
      );
    }
  } else {
    return (
        <AppLoading
            startAsync={getFonts}
            onFinish={() => setFontsLoaded(true)}
            onError={console.warn}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
