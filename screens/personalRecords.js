import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, } from "react-native";
import { settingStyles, globalStyles } from "../styles/global";
import { Checkbox } from 'react-native-paper';
import firebase from 'firebase';
import * as Auth from '../api/auth';
import * as DB from '../api/database';


export default function PersonalRecords({ navigation, route }) {
    const { _recordsToDisplay } = route.params 
    const [userProfile, setUserProfile] = useState({});
    const [userId, setUserId] = useState(Auth.getCurrentUserId());
    const [recordsToDisplay, setRecordsToDisplay] = useState(_recordsToDisplay);

    useEffect(() => {
        DB.getUserProfile(userId, setUserProfile);
        DB.subscribe(userId, setRecordsToDisplay);
    }, []);

    const FlatListItemSeparator = () => {
        return (
            //Item Separator
            <View style={settingStyles.listItemSeparatorStyle} />
        );
    };

    // const handleEditInfo = (title, index, item, text) => {
    //     if (title === 'Fitness Information') {
    //         let temp = [...fitnessInfo];
    //         temp[index][1] = text;
    //         setFitnessInfo(temp);
    //         DB.updateInfo(uid, 'fitnessInfo', item, text).then();
    //     } else if (title === 'User Information') {
    //         let temp = [...userInfo];
    //         temp[index][1] = text;
    //         setUserInfo(temp);
    //         DB.updateInfo(uid, 'userInfo', item, text).then();
    //     }
    // }

    const ExplanatoryText = ({ recordsToDisplay }) => {
        if (recordsToDisplay !== []) {
            return <Text style={globalStyles.text}>This is going on your profile! Choose what you want to show</Text>
        } else { 
            return <Text style={globalStyles.text}>Start breaking some records!</Text>
        }
        
    }

    return (
        <View style={globalStyles.container}>
            <ExplanatoryText recordsToDisplay={recordsToDisplay} />
            <FlatList
                ItemSeparatorComponent={FlatListItemSeparator}
                data={userProfile.personalRecords ? Object.values(userProfile.personalRecords) : null}
                renderItem={({ item, index }) => {
                    let label = ''
                    // if (item.exerciseCategory === cardio) {
                    //     label = item.exerciseName + ": " + item.weight + "kg" + " x " + item.reps;
                    // } else { 
                    label = item.exerciseName + ": " + item.weight + "kg" + " x " + item.reps;
                    // }

                    return (
                        
                        <Checkbox.Item
                            label={label}
                            labelStyle={globalStyles.cardText}
                            status={item.displayOnProfile ? 'checked' : 'unchecked'}
                            onPress={() => DB.addPR(userId, item.exerciseName, [item.weight, item.reps], ! item.displayOnProfile)}
                        />
                        
                    );
                }
                }
            keyExtractor={(item, index) => index}
            />
        </View>
    );
}
