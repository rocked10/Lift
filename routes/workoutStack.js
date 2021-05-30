import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Workout from '../screens/workout';
import WorkoutDetails from "../screens/workoutDetails";


const { Navigator, Screen } = createStackNavigator();

const WorkoutStack = () => (
    <Navigator
        initialRouteName={"Workout"}
        screenOptions={{
            headerStyle: {
                backgroundColor: '#eee',
                height: 80,
            },

            headerTintColor: '#444',
        }}
    >
        <Screen name='Workout' component={Workout} />
        <Screen name='WorkoutDetails' component={WorkoutDetails} options={{title: "Workout Details"}} />
    </Navigator>
);

export default WorkoutStack;