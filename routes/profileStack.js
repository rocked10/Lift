import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import Profile from "../screens/profile";
import Settings from "../screens/settings";
import Header from "../shared/header";
import AthleteList from "../screens/athleteList"


const { Navigator, Screen } = createStackNavigator();

const ProfileStack = ({ navigation }) => (
    <Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: '#eee',
                height: 60,
            },

            headerTintColor: '#444',
        }}
    >
        <Screen name='Profile' component={Profile}
                options={{ headerTitle: () => <Header navigation={navigation} title='Profile' /> }}/>
        <Screen name='Settings' component={Settings} />
        <Screen name='Athlete List' component={AthleteList} />
    </Navigator>
);

export default ProfileStack;