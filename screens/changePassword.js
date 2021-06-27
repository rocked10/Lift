import React, {useState} from "react";
import {View, Text, TextInput, Alert} from "react-native";
import { Button } from "react-native-paper";
import { loginStyles } from "../styles/global";
import { AntDesign } from "@expo/vector-icons";
import * as Auth from "../api/auth";


export default function ChangePassword({ navigation }) {
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handlePress = async () => {
        if (password !== password2) {
            Alert.alert(
                "Error",
                "The passwords do not match!",
                [{ text: "OK", onPress: () => console.log("Ok pressed") }]
            );
        } else if (password.length < 8) {
            Alert.alert(
                "Error",
                "Please enter a password that is longer than 8 characters!",
                [{ text: "OK", onPress: () => console.log("Ok pressed") }]
            );
        } else if (password === password2) {
            await Auth.changePassword(password,
                () => {
                    Alert.alert(
                        "Password successfully changed!",
                        "Press OK to go back",
                        [{ text: "OK", onPress: () => navigation.navigate('Profile') }]
                    );
                },
                () => {}
            );
        }
    }

    return (
        <View style={loginStyles.container} >

            <View style={loginStyles.inputView} >
                <AntDesign name="lock" size={24} color="black" />
                <TextInput
                    style={loginStyles.inputText}
                    placeholder='Enter a new password...'
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
            </View>

            <View style={loginStyles.inputView} >
                <AntDesign name="lock" size={24} color="black" />
                <TextInput
                    style={loginStyles.inputText}
                    placeholder='Confirm your new password...'
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword2(text)}
                    value={password2}
                />
            </View>

            <Button onPress={handlePress}>Change Password</Button>
        </View>
    );
}