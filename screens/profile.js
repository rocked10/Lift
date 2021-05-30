import React from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";
import firebase from 'firebase';

export default function Profile() {
    const signOut = () => {
        firebase.auth().signOut()
            .then(() => {
                console.log("Successfully signed out");
            }).catch((error) => {
                console.log(error);
        });
    }

    return (
        <View style={globalStyles.container}>
            <Text>Profile</Text>
            <TouchableOpacity
                onPress={signOut}
            >
                <Text>Sign out</Text>
            </TouchableOpacity>
        </View>
    );
}