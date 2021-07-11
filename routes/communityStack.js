import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Community from "../screens/community";
import CreatePost from "../screens/createPost";
import Header from "../shared/header";
import AttachWorkout from "../screens/attachWorkout";
import CommunityPost from "../screens/communityPost"
import { navigationStyles } from '../styles/global';
import WorkoutDetails from "../screens/workoutDetails";


const { Navigator, Screen } = createStackNavigator();

const CommunityStack = ({ navigation }) => (
    <Navigator screenOptions={{ ...navigationStyles, ...styles }} >
        <Screen name='Community' component={Community} options={{ headerTitle: () => <Header navigation={navigation} title='Community' /> }}/>
        <Screen name='Community Post' component={CommunityPost} options={{ headerTitle: () => <Header navigation={navigation} title='Post' /> }} />
        <Screen name='Create Post' component={CreatePost} options={{ headerTitle: () => <Header navigation={navigation} title='Create Post' /> }} />
        <Screen name='Attach Workout' component={AttachWorkout} options={{ headerTitle: () => <Header navigation={navigation} title='Attach Workout' /> }} />
        <Screen name='Workout Details' component={WorkoutDetails} options={{ headerTitle: () => <Header navigation={navigation} title='Workout Details' /> }}/>
    </Navigator>
);

export default CommunityStack;


const styles = {
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
}