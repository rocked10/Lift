import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Exercises from '../screens/exercises';
import ExerciseDescription from "../screens/exerciseDescription";
import Header from "../shared/header";
import { navigationStyles } from '../styles/global';


const { Navigator, Screen } = createStackNavigator();

const ExercisesStack = ({ navigation }) => (
    <Navigator screenOptions={navigationStyles} >
        <Screen name='Exercises' component={Exercises}
                options={{ headerTitle: () => <Header navigation={navigation} title='Exercises' /> }}/>
        <Screen name='ExerciseDescription' component={ExerciseDescription}
                options={{ headerTitle: () => <Header navigation={navigation} title='Video Demonstration' /> }}/>
    </Navigator>
);

export default ExercisesStack;