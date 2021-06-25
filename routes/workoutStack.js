import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Workout from '../screens/workout';
import WorkoutDetails from "../screens/workoutDetails";
import Header from "../shared/header";
import { navigationStyles } from '../styles/global';
import WorkoutTabs from "./workoutTabs";
import * as DB from "../api/database";


const { Navigator, Screen } = createStackNavigator();


const WorkoutStack = ({ navigation }) => {
    const [role, setRole] = useState('');

    useEffect(() => {
        DB.getUserType(setRole);
    }, [role]);

    return (
        <Navigator screenOptions={navigationStyles} >
            <Screen name='Workout' component={role === 'Coach' ? WorkoutTabs : Workout}
                options={{ headerTitle: () => <Header navigation={navigation} title='Workout' /> }}/>
            <Screen name="Workout Details" component={WorkoutDetails}
                    options={{ headerTitle: () => <Header navigation={navigation} title='Workout Details' /> }}/>
        </Navigator>
    )
};

export default WorkoutStack;