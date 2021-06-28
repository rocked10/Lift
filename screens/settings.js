import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SectionList, Alert } from "react-native";
import * as Auth from "../api/auth";
import { settingStyles } from "../styles/global";
import * as DB from "../api/database";


export default function Settings({ navigation }) {

    const FlatListItemSeparator = () => {
        return (
          //Item Separator
          <View style={settingStyles.listItemSeparatorStyle} />
        );
    };

    const handleAccount = (item) => {
        if (item === 'Change password') {
            navigation.navigate('Change Password');
        } else if (item === 'Change email') {
            navigation.navigate('Change Email');
        } else if (item === 'Delete account') {
            Alert.alert(
                "",
                "Are you sure you want to delete your account? This action cannot be undone.",
                [{ text: "Cancel", onPress: () => console.log("Cancel Pressed") },
                    { text: "OK", onPress: () => {
                        DB.deleteUser(Auth.getCurrentUserId()).then();
                        Auth.deleteUser();
                    }}
                ]
            );
        } else if (item === 'Personal Records') {
            navigation.navigate('Personal Records')
        }
    }

    return (
        <View style={settingStyles.container}>
            <SectionList
                ItemSeparatorComponent={FlatListItemSeparator}
                sections={[
                    { title: 'Account', data: ['Change email', 'Change password', 'Enable workout notifications', 'Delete account'] },
                    { title: 'General', data: ['Personal Records'] }
                ]}

                renderItem = {({item, index, section}) => {
                    return (
                        <TouchableOpacity onPress={() => handleAccount(item)}>
                            <Text style={settingStyles.item}>{item}</Text>
                        </TouchableOpacity>
                    );
                }}

                renderSectionHeader={({ section }) => <Text style={settingStyles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
            />
        </View>
    );
}
