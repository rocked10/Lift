import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Community from "../screens/community";
import CreatePost from "../screens/createPost";
import Header from "../shared/header";
import AttachWorkout from "../screens/attachWorkout";
import { navigationStyles } from '../styles/global';
import { StyleSheet } from 'react-native';
import WorkoutDetails from "../screens/workoutDetails";


const { Navigator, Screen } = createStackNavigator();

const CommunityStack = ({ navigation }) => (
    <Navigator screenOptions={{ ...navigationStyles, ...styles }} >
        <Screen name='History' component={Community} options={{ headerTitle: () => <Header navigation={navigation} title='Community' /> }}/>
        <Screen name='Create Post' component={CreatePost} options={{ headerTitle: () => <Header navigation={navigation} title='Create Post' /> }} />
        <Screen name='Attach Workout' component={AttachWorkout} options={{ headerTitle: () => <Header navigation={navigation} title='Attach Workout' /> }} />
        <Screen name='Workout Details' component={WorkoutDetails} options={{ headerTitle: () => <Header navigation={navigation} title='Workout Details' /> }}/>
    </Navigator>
);

export default CommunityStack;


const styles = {
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
}