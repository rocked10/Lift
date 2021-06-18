import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Workout from '../screens/workout';
import WorkoutDetails from "../screens/workoutDetails";
import Header from "../shared/header";
import { navigationStyles } from '../styles/global';


const { Navigator, Screen } = createStackNavigator();

const WorkoutStack = ({ navigation }) => (
    <Navigator screenOptions={navigationStyles} >
        <Screen name='Workout' component={Workout}
            options={{ headerTitle: () => <Header navigation={navigation} title='Workout' /> }}/>
        <Screen name='WorkoutDetails' component={WorkoutDetails}
                options={{ headerTitle: () => <Header navigation={navigation} title='Workout Details' /> }}/>
    </Navigator>
);

export default WorkoutStack;