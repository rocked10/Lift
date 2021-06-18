import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, LogBox } from 'react-native';
import Login from "./screens/login";
import { TabStack } from "./routes/tabStack";
import firebase from 'firebase';
import firebaseApp from "./api/firebase";
import { MenuProvider } from 'react-native-popup-menu';
import * as Font from 'expo-font'
import Loading from "./screens/loading";
import AppLoading from "expo-app-loading";


LogBox.ignoreLogs(["Setting a timer for a long period of", "Failed child context type", "Failed context type"]);

const getFonts = () => {
  return Font.loadAsync({
    'lato-regular': require('./assets/fonts/Lato-Regular.ttf'),
    'lato-bold': require('./assets/fonts/Lato-Bold.ttf')
  });
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(''); // '': loading, 0: logged out, 1: logged in

  const userDetails = async (details) => {
    setEmail(details.email.toLowerCase());
    setPassword(details.password);

    await firebase.auth().signInWithEmailAndPassword(email.trim(), password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setLoggedIn('1');
        })
        .catch((error) => {
          console.log(error.message);
          Alert.alert(
              "Error",
              error.message,
              [{ text: "OK",
                onPress: () => console.log("OK Pressed") }]
          )
        });
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
          <Login userDetails={userDetails}/>
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
