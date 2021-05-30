import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Alert, StatusBar } from "react-native";
import { Formik } from 'formik';
import firebase from 'firebase';
import { loginStyles } from "../styles/global";

export default function Signup() {

    return (
        <View style={loginStyles.container}>
            <Formik
                initialValues = {{email: '', password: '' }}
                onSubmit={(values, actions) => {
                    console.log(values);
                    actions.resetForm();

                    // Sign up user
                    firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
                        .then((userCredential) => {
                            // Signed in
                            Alert.alert(
                                "Successfully signed up!",
                                "Press OK to go back",
                                [{ text: "OK", onPress: () => console.log("OK Pressed") }]
                            );
                        })
                        .catch((error) => {
                            console.log(error.message);
                            Alert.alert(
                                "Error",
                                error.message,
                                [
                                    { text: "OK",
                                        onPress: () => console.log("OK Pressed") }
                                ]
                            )
                        })
                }}
            >
                {(props) => (
                    <View>
                        <View style={loginStyles.inputView} >
                            <TextInput
                                style={loginStyles.inputText}
                                placeholder='Enter your email...'
                                onChangeText={props.handleChange('email')}
                                value={props.values.email}
                            />
                        </View>

                        <View style={loginStyles.inputView} >
                            <TextInput
                                style={loginStyles.inputText}
                                placeholder='Enter a password...'
                                secureTextEntry={true}
                                onChangeText={props.handleChange('password')}
                                value={props.values.password}
                            />
                        </View>

                        <Button title='SIGNUP' onPress={props.handleSubmit} />
                    </View>
                )}

            </Formik>

            <StatusBar></StatusBar>
        </View>
    );
}