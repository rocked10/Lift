import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import AppLoading from 'expo';
import Login from "./screens/login";
import { TabStack } from "./routes/tabStack";
import firebase from 'firebase';
import firebaseApp from "./api/firebase";

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState('false');

  const userDetails = (details) => {
    setEmail(details.email.toLowerCase());
    setPassword(details.password);

    firebase.auth().signInWithEmailAndPassword(email.trim(), password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setLoggedIn(true);
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
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  })

  if (loggedIn) {
    return (
        <TabStack />
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
