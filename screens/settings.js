import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Button, SectionList, Alert } from "react-native";
import { globalStyles } from "../styles/global";
import { TextInput } from 'react-native-paper';
import firebase from 'firebase';
import * as Auth from '../api/auth';
import * as DB from '../api/database';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import CustomButton from '../shared/customButton'


export default function Settings() {
    // const userInfoFields = []
    const [username, setUsername] = useState('');

    useEffect(() => {
        DB.getUserName(setUsername);
    }, [])

    const FlatListItemSeparator = () => {
        return (
          //Item Separator
          <View style={styles.listItemSeparatorStyle} />
        );
    };

    const handlePress = (item, section) => {
        let sectionTitle = section.title;
        if (sectionTitle === 'User Information') {
            handleUser(item);
        } else if (sectionTitle === 'Fitness') {
            handleFitness(item);
        } else {
            handleAccount(item);
        }
    }

    const handleUser = (item) => {
        console.log(item);
    }

    const handleFitness = (item) => {
        console.log(item);
    }

    const handleAccount = (item) => {
        console.log(item);
        if (item === 'Change password') {
            // Auth.changePassword();
        }
    }

    const [fitnessInfo, setFitnessInfo] = useState([{ key: 'Gender', value: 'LMAO'}, { key: 'Height', value: '10'},
        {key: 'Weight', value: '100'}]);

    return (
        <View style={styles.container}>
            <SectionList
                ItemSeparatorComponent={FlatListItemSeparator}
                sections={[
                    { title: 'User Information', data: [`Username: ${username}`, `Email: ${Auth.getCurrentUserEmail()}`, 'City', 'State', 'Country', 'Bio'] },
                    { title: 'Fitness Information', data: fitnessInfo },
                    { title: 'Account', data: ['Change password', 'Enable workout notifications', 'Delete account'] },
                ]}

                renderItem = {({item, index, section}) => {
                    if (section.title === 'Account') {
                        return (
                            <TouchableOpacity onPress={() => handlePress(item, section)}>
                                <Text style={styles.item}>{item}</Text>
                            </TouchableOpacity>
                        );
                    } else {
                        return (
                            <TextInput
                                label={item.key}
                                onChangeText={(text) => {
                                    let temp = fitnessInfo;
                                    temp[index].value = text;
                                    setFitnessInfo(temp);
                                }}
                            />
                        );
                    }
                }}

                renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
            />
        </View>
    )
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