import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Button, SectionList, Alert } from "react-native";
import { globalStyles } from "../styles/global";
import { TextInput } from 'react-native-paper';
import firebase from 'firebase';
import * as Auth from '../api/auth';
import * as DB from '../api/database';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import CustomButton from '../shared/customButton'


export default function EditProfile({ navigation, route }) {
    const { userProfile } = route.params;
    const [uid, setUid] = useState(Auth.getCurrentUserId());
    const [accountInfo, setAccountInfo] = useState(Object.entries({ email: userProfile.email, role: userProfile.role, }));
    const [userInfo, setUserInfo] = useState(Object.entries({ name: userProfile.name, bio: userProfile.bio }));// editable Info
    const [fitnessInfo, setFitnessInfo] = useState(userProfile.fitnessInfo ? Object.entries(userProfile.fitnessInfo) : []);

    const FlatListItemSeparator = () => {
        return (
            //Item Separator
            <View style={styles.listItemSeparatorStyle} />
        );
    };

    const handleEditInfo = (title, index, item, text) => {
        if (title === 'Fitness Information') {
            let temp = [...fitnessInfo];
            temp[index][1] = text;
            setFitnessInfo(temp);
            DB.updateInfo(uid, 'fitnessInfo', item, text).then();
        } else if (title === 'User Information') {
            let temp = [...userInfo];
            temp[index][1] = text;
            setUserInfo(temp);
            DB.updateInfo(uid, 'userInfo', item, text).then();
        }
    }

    return (
        <View style={styles.container}>
            <SectionList
                ItemSeparatorComponent={FlatListItemSeparator}
                sections={[
                    { title: 'Account Information', data: accountInfo },
                    { title: 'User Information', data: userInfo },
                    { title: 'Fitness Information', data: fitnessInfo},
                ]}

                renderItem = {({item, index, section}) => {
                    if (section.title === 'Account Information') {
                        return (
                            <TextInput
                                label={item[0]}
                                value={item[1]}
                                editable={false}
                            />
                        );
                    } else {
                        return (
                            <TextInput
                                label={item[0]}
                                value={item[1]}
                                onChangeText={(text) => { handleEditInfo(section.title, index, item[0], text) }}
                            />
                        );
                    }
                }}

                renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 20,
        fontWeight: 'bold',
        color: "#fff",
        backgroundColor: '#6495ed',
    },

    itemLabel: {
        padding: 10,
        fontSize: 14,
    },

    item: {
        padding: 10,
        fontSize: 16,
        height: 40,
    },

    listItemSeparatorStyle: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#C8C8C8',
    },
})