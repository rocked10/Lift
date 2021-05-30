import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import History from "../screens/history";


const { Navigator, Screen } = createStackNavigator();

const HistoryStack = () => (
    <Navigator
        initialRouteName={"History"}
        screenOptions={{
            headerStyle: {
                backgroundColor: '#eee',
                height: 80,
            },

            headerTintColor: '#444',
        }}
    >
        <Screen name='History' component={History} />
    </Navigator>
);

export default HistoryStack;