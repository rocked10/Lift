import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, LogBox } from 'react-native';
import Login from "./screens/login";
import { TabStack } from "./routes/tabStack";
import firebase from 'firebase';
import firebaseApp from "./api/firebase";
import { MenuProvider } from 'react-native-popup-menu';
// import * as Font from 'expo-font'
import Loading from "./screens/loading";

LogBox.ignoreLogs(["Setting a timer for a long period of"]);
LogBox.ignoreLogs(["Each child in a list should have"]);

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(''); // '': loading, 0: logged out, 1: logged in

  const userDetails = (details) => {
    setEmail(details.email.toLowerCase());
    setPassword(details.password);

    firebase.auth().signInWithEmailAndPassword(email.trim(), password)
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

  if (! loggedIn) {
    return (
        <Loading />
    );
  } else if (loggedIn === '1') {
    return (
      <MenuProvider>
        <TabStack />
      </MenuProvider>
    );
  } else {
    return (
        <Login userDetails={userDetails}/>
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
