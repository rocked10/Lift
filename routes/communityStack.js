import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Community from "../screens/community";
import Header from "../shared/header";
import { navigationStyles } from '../styles/global';


const { Navigator, Screen } = createStackNavigator();

const CommunityStack = ({ navigation }) => (
    <Navigator screenOptions={navigationStyles} >
        <Screen name='History' component={Community}
                options={{ headerTitle: () => <Header navigation={navigation} title='Community' /> }}/>
    </Navigator>
);

export default CommunityStack;