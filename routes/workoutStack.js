import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Workout from '../screens/workout';
import WorkoutDetails from "../screens/workoutDetails";
import EditWorkout from "../screens/editWorkout";
import Header from "../shared/header";
import Settings from "../screens/settings";


const { Navigator, Screen } = createStackNavigator();

const WorkoutStack = ({ navigation }) => (
    <Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: '#eee',
                height: 60,
            },

            headerTintColor: '#444',
        }}
    >
        <Screen name='Workout' component={Workout}
            options={{ headerTitle: () => <Header navigation={navigation} title='Workout' /> }}/>
        <Screen name='WorkoutDetails' component={WorkoutDetails} />
        <Screen name='EditWorkout' component={EditWorkout} />
    </Navigator>
);

export default WorkoutStack;