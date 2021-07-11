import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationStyles } from '../styles/global';

import Profile from "../screens/profile";
import Settings from "../screens/settings";
import EditProfile from "../screens/editProfile";
import Header from "../shared/header";
import Athletes from "../screens/athletes"
import ChangePassword from "../screens/changePassword";
import ChangeEmail from "../screens/changeEmail";
import PersonalRecords from "../screens/personalRecords";
import Test from "../api/notifications";


const { Navigator, Screen } = createStackNavigator();

const ProfileStack = ({ navigation }) => (
    <Navigator screenOptions={ navigationStyles } >
        <Screen name='Profile' component={Profile}
                options={{ headerTitle: () => <Header navigation={navigation} title='Profile' displaySettings={true}/> }}/>
        <Screen name='View Profile' component={Profile}
                options={{ headerTitle: () => <Header navigation={navigation} title='Profile' /> }}/>
        <Screen name='Settings' component={Settings}
                options={{ headerTitle: () => <Header navigation={navigation} title='Settings' /> }}/>
        <Screen name='Edit Profile' component={EditProfile}
                options={{ headerTitle: () => <Header navigation={navigation} title='Edit Profile' />}} />
        <Screen name='Change Password' component={ChangePassword}
                options={{ headerTitle: () => <Header navigation={navigation} title='Change Password' />}} />
        <Screen name='Athlete List' component={Athletes}
                options={{ headerTitle: () => <Header navigation={navigation} title='Athlete List' />}} />
        <Screen name='Change Email' component={ChangeEmail}
                options={{headerTitle: () => <Header navigation={navigation} title='Change Email' />}} />
        <Screen name='Personal Records' component={PersonalRecords}
                options={{headerTitle: () => <Header navigation={navigation} title='Personal Records' />}} />
    </Navigator>
);

export default ProfileStack;