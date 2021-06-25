import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Workout from '../screens/workout';
import AthleteWorkoutStack from "./athleteWorkoutStack";


const Tab = createMaterialTopTabNavigator();

export default function WorkoutTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="My Workouts" component={Workout} />
      <Tab.Screen name="Athletes' Workouts" component={AthleteWorkoutStack} />
    </Tab.Navigator>
  );
}
