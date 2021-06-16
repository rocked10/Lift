import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import Exercises from '../screens/exercises';
import Settings from "../screens/settings";
import Header from "../shared/header";


const { Navigator, Screen } = createStackNavigator();

const ExercisesStack = ({ navigation }) => (
    <Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: '#eee',
                height: 60,
            },

            headerTintColor: '#444',
        }}
    >
        <Screen name='Exercises' component={Exercises}
                options={{ headerTitle: () => <Header navigation={navigation} title='Exercises' /> }}/>
    </Navigator>
);

export default ExercisesStack;