import React, { useState } from "react";
import {View, Text, TextInput, Alert} from "react-native";
import { Button } from "react-native-paper";
import { loginStyles } from "../styles/global";
import { MaterialIcons} from "@expo/vector-icons";
import * as Auth from "../api/auth";


export default function ChangeEmail({ navigation }) {
    const [email, setEmail] = useState('');

    const handlePress = async () => {
        await Auth.changeEmail(email.toLowerCase().trim(),
            () => {
                Alert.alert(
                    "Email successfully changed!",
                    "Press OK to go back",
                    [{ text: "OK", onPress: () => navigation.navigate('Profile') }]
                );
            },
            () => {}
        );
    }

    return (
        <View style={loginStyles.container} >

            <View style={loginStyles.inputView} >
                <MaterialIcons name="email" size={24} color="black" />
                <TextInput
                    style={loginStyles.inputText}
                    placeholder='Enter your email...'
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
            </View>

            <Button onPress={handlePress}>Change Email</Button>
        </View>
    );
}