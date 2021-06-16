import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AthletesWorkouts from "../screens/athletesWorkouts";
import WorkoutDetails from "../screens/workoutDetails";

const { Navigator, Screen } = createStackNavigator();

const AthleteWorkoutStack = ({ navigation }) => (
    <Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: '#eee',
                height: 60,
            },

            headerTintColor: '#444',
        }}
    >

        <Screen name="Athletes' Workouts" component={AthletesWorkouts} />
        <Screen name="Workout Details" component={WorkoutDetails} /> 
    </Navigator>
);

export default AthleteWorkoutStack;
