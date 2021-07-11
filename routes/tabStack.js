import React, { useState, useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import WorkoutStack from "./workoutStack";
import ProfileStack from "./profileStack";
import ExercisesStack from "./exercisesStack";
import CommunityStack from "./communityStack";
import { createStackNavigator } from "@react-navigation/stack";
import * as DB from '../api/database';


const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

export const TabStack = () => {
    const [role, setRole] = useState('');

    useEffect(() => {
        DB.getUserType(setRole);
    }, [role]);

    return (
        <NavigationContainer>
            <React.Fragment>
                <Tab.Navigator
                    initialRouteName='Workout'
                    shifting={true}
                >
                    <Tab.Screen
                        name='Profile'
                        component={ProfileStack}
                        options={{
                            tabBarIcon: 'account-circle'
                        }}
                    />

                    <Tab.Screen
                        name='Workout'
                        component={WorkoutStack}
                        options={{
                            tabBarIcon: 'weight-lifter'
                        }}
                    />

                    <Tab.Screen
                        name='Exercises'
                        component={ExercisesStack}
                        options={{
                            tabBarIcon: 'dumbbell'
                        }}
                    />

                    <Tab.Screen
                        name='Community'
                        component={CommunityStack}
                        options={{
                            tabBarIcon: 'account-multiple'
                        }}
                    />

                </Tab.Navigator>
            </React.Fragment>

        </NavigationContainer>
    ) 
}
