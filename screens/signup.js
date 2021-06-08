import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Alert, StatusBar, Text } from "react-native";
import { Formik } from 'formik';
import firebase from 'firebase';
import { loginStyles } from "../styles/global";
import * as DB from '../api/database';
import * as Auth from '../api/auth';
import { Picker as SelectPicker } from "@react-native-picker/picker";

export default function Signup() {
    return (
        <View style={loginStyles.container}>
            <Formik
                initialValues = {{email: '', username: '', password: '', role: '' }}
                onSubmit={(values, actions) => {
                    console.log(values);
                    actions.resetForm();

                    // Sign up user
                    firebase.auth().createUserWithEmailAndPassword(values.email.trim().toLowerCase(), values.password)
                        .then((userCredential) => {
                            // Signed in
                            Alert.alert(
                                "Successfully signed up!",
                                "Press OK to go back",
                                [{ text: "OK", onPress: () => console.log("OK Pressed") }]
                            );

                            // Add User Profile
                            DB.addUserProfile(Auth.getCurrentUserId(), values.username, values.email, values.role);
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
                        });

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
                                placeholder='Enter a username...'
                                onChangeText={props.handleChange('username')}
                                value={props.values.username}
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

                        <Text style={{marginLeft: 20}}>I am a...</Text>
                        <SelectPicker
                            selectedValue={props.values.role}
                            onValueChange={(itemValue, itemIndex) =>
                                props.setFieldValue('role', itemValue)
                            }

                        >
                            <SelectPicker.Item label="Coach" value="coaches" />
                            <SelectPicker.Item label="Athlete" value="athletes" />
                        </SelectPicker>

                        <Button title='SIGNUP' onPress={props.handleSubmit} />
                    </View>
                )}

            </Formik>

            <StatusBar></StatusBar>
        </View>
    );
}