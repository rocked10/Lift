import React, {useState, useEffect} from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WorkoutStack from "./workoutStack";
import ProfileStack from './profileStack';
import ExercisesStack from "./exercisesStack";
import CommunityStack from "./communityStack";
import { createStackNavigator } from "@react-navigation/stack";
import WorkoutTabs from "./workoutTabs";
import * as DB from '../api/database';


const { Navigator, Screen } = createBottomTabNavigator();

const Stack = createStackNavigator();

export const TabStack = () => {
    const [role, setRole] = useState('');

    useEffect(() => {
        DB.getUserType(setRole);
    }, [role]);

    return (
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
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name='account-circle' color='black' size={26} />
                        )
                    }}
                />

                <Screen
                    name='Workout'
                    component={role === 'Coach' ? WorkoutTabs : WorkoutStack}
                    options={{
                        tabBarLabel: 'Workout',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name='weight-lifter' color='black' size={26} />
                        )
                    }}
                />

                <Screen
                    name='Exercises'
                    component={ExercisesStack}
                    options={{
                        tabBarLabel: 'Exercises',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name='dumbbell' color='black' size={26} />
                        )
                    }}
                />

                <Screen
                    name='Community'
                    component={CommunityStack}
                    options={{
                        tabBarLabel: 'Community',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name='account-multiple' color='black' size={26} />
                        )
                    }}
                />

            </Navigator>

        </NavigationContainer>
    ) 
}
