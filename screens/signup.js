import React from 'react';
import { TextInput, View, Alert, StatusBar, Text } from "react-native";
import { Formik } from 'formik';
import { loginStyles } from "../styles/global";
import * as DB from '../api/database';
import * as Auth from '../api/auth';
import { Picker as SelectPicker } from "@react-native-picker/picker";
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Button } from 'react-native-paper'


export default function Signup() {
    return (
        <View style={loginStyles.container}>
            <Formik
                initialValues = {{email: '', username: '', password: '', password2: '', role: 'Coach' }}
                onSubmit={(values, actions) => {
                    if (values.password !== values.password2) {
                        Alert.alert(
                            "Error",
                            "The passwords do not match!",
                            [{ text: "OK", onPress: () => console.log("Ok pressed") }]
                        );
                    } else if (values.password.length < 8) {
                        Alert.alert(
                            "Error",
                            "Please enter a password that is longer than 8 characters!",
                            [{ text: "OK", onPress: () => console.log("Ok pressed") }]
                        );
                    } else if (values.password === values.password2) {
                        Auth.signUp(values.username, values.email.toLowerCase().trim(), values.password, values.role,
                            (user) => {
                                Alert.alert(
                                    "Successfully signed up!",
                                    "Press OK to go back",
                                    [{text: "OK", onPress: () => console.log("OK Pressed")}]
                                );
                                DB.addUserProfile(user.uid, values.username, values.email.toLowerCase().trim(), values.role);
                            },
                            () => {
                            },
                        ).then();
                    }
                }}
            >
                {(props) => (
                    <View>
                        <View style={loginStyles.inputView} >
                            <MaterialIcons name="email" size={24} color="black" />
                            <TextInput
                                style={loginStyles.inputText}
                                placeholder='Enter your email...'
                                onChangeText={props.handleChange('email')}
                                value={props.values.email}
                            />
                        </View>

                        <View style={loginStyles.inputView} >
                            <Ionicons name="person" size={24} color="black" />
                            <TextInput
                                style={loginStyles.inputText}
                                placeholder='Enter a username...'
                                onChangeText={props.handleChange('username')}
                                value={props.values.username}
                            />
                        </View>

                        <View style={loginStyles.inputView} >
                            <AntDesign name="lock" size={24} color="black" />
                            <TextInput
                                style={loginStyles.inputText}
                                placeholder='Enter a password...'
                                secureTextEntry={true}
                                onChangeText={props.handleChange('password')}
                                value={props.values.password}
                            />
                        </View>

                        <View style={loginStyles.inputView} >
                            <AntDesign name="lock" size={24} color="black" />
                            <TextInput
                                style={loginStyles.inputText}
                                placeholder='Confirm your password...'
                                secureTextEntry={true}
                                onChangeText={props.handleChange('password2')}
                                value={props.values.password2}
                            />
                        </View>

                        <Text style={{marginLeft: 8}}>I am a...</Text>

                        <SelectPicker
                            selectedValue={props.values.role}
                            onValueChange={(itemValue, itemIndex) =>
                                props.setFieldValue('role', itemValue)
                            }

                        >
                            <SelectPicker.Item label="Coach" value="Coach" />
                            <SelectPicker.Item label="Athlete" value="Athlete" />
                        </SelectPicker>

                        <Button onPress={props.handleSubmit} mode="contained" style={{marginVertical: 10}}>
                            <Text style={{fontFamily: 'karla-bold'}}>SIGNUP</Text>
                        </Button>
                    </View>
                )}

            </Formik>

            <StatusBar></StatusBar>
        </View>
    );
}