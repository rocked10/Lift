import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AthletesWorkouts from "../screens/athletesWorkouts";
import WorkoutDetails from "../screens/workoutDetails";
import AthleteWorkoutList from "../screens/athleteWorkoutList"

const { Navigator, Screen } = createStackNavigator();

const AthleteWorkoutStack = ({ navigation }) => (
    <Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
        <Screen name="Athletes' Workouts" component={AthletesWorkouts} />
        <Screen name="Athlete Workout List" component={AthleteWorkoutList} />
        <Screen name="Workout Details" component={WorkoutDetails} /> 
    </Navigator>
);

export default AthleteWorkoutStack;
