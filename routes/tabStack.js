import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import WorkoutStack from "./workoutStack";
import ProfileStack from './profileStack';
import ExercisesStack from "./exercisesStack";

import HistoryStack from "./historyStack";
const { Navigator, Screen } = createBottomTabNavigator();

export const TabStack = () => (
    <NavigationContainer>
        <Navigator
            initialRouteName='Workout'
            tabBarOptions={{
                activeTintColor: '#7B68EE',
                style: {
                    backgroundColor: '#DCDCDC',
                    height: 58,
                    padding: 8,
                },
                labelStyle: {
                    fontSize: 12,
                    padding: 4
                }
            }}
        >
            <Screen
                name='Profile'
                component={ProfileStack}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size}) => (
                        <MaterialCommunityIcons name='account-circle' color='black' size={26}/>
                    )
                }}
            />

            <Screen
                name='Workout'
                component={WorkoutStack}
                options={{
                    tabBarLabel: 'Workout',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name='plus-thick' color='black' size={26} />
                    )
                }}
            />

            <Screen
                name='Exercises'
                component={ExercisesStack}
                options={{
                    tabBarLabel: 'Exercises',
                    tabBarIcon: ({ color, size}) => (
                        <MaterialCommunityIcons name='dumbbell' color='black' size={26}/>
                    )
                }}
            />

            <Screen
                name='History'
                component={HistoryStack}
                options={{
                    tabBarLabel: 'History',
                    tabBarIcon: ({ color, size}) => (
                        <MaterialCommunityIcons name='clock' color='black' size={26}/>
                    )
                }}
            />

        </Navigator>
    </NavigationContainer>
)