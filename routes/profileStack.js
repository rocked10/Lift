import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from "../screens/profile";
import Settings from "../screens/settings";
import Header from "../shared/header";
import AthleteList from "../screens/athleteList"
import { navigationStyles } from '../styles/global';


const { Navigator, Screen } = createStackNavigator();

const ProfileStack = ({ navigation }) => (
    <Navigator screenOptions={navigationStyles} >
        <Screen name='Profile' component={Profile}
                options={{ headerTitle: () => <Header navigation={navigation} title='Profile' displaySettings={true}/> }}/>
        <Screen name='Settings' component={Settings}
                options={{ headerTitle: () => <Header navigation={navigation} title='Settings' /> }}/>
        <Screen name='Athlete List' component={AthleteList} />
    </Navigator>
);

export default ProfileStack;