import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import Profile from "../screens/profile";
import Settings from "../screens/settings";


const { Navigator, Screen } = createStackNavigator();

const ProfileStack = () => (
    <Navigator
        initialRouteName={"Profile"}
        screenOptions={{
            headerStyle: {
                backgroundColor: '#eee',
                height: 80,
            },

            headerTintColor: '#444',
        }}
    >
        <Screen name='Settings' component={Settings} />
        <Screen name='Profile' component={Profile} />
    </Navigator>
);

export default ProfileStack;