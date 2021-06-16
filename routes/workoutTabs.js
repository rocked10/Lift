import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "../screens/settings";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import WorkoutStack from "./workoutStack";
import AthleteWorkoutStack from "./athleteWorkoutStack";
import * as DB from '../api/database';

const Tab = createMaterialTopTabNavigator();

export default function WorkoutTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="My Workouts" component={WorkoutStack} />
      <Tab.Screen name="Athletes' Workouts" component={AthleteWorkoutStack} />
    </Tab.Navigator>
  );
}
