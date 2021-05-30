import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import Exercises from '../screens/exercises';


const { Navigator, Screen } = createStackNavigator();

const ExercisesStack = () => (
    <Navigator
        initialRouteName={"Exercises"}
        screenOptions={{
            headerStyle: {
                backgroundColor: '#eee',
                height: 80,
            },

            headerTintColor: '#444',
        }}
    >
        <Screen name='Exercises' component={Exercises} />
    </Navigator>
);

export default ExercisesStack;