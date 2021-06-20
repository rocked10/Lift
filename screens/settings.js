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


export default function Settings({ navigation }) {

    const FlatListItemSeparator = () => {
        return (
          //Item Separator
          <View style={styles.listItemSeparatorStyle} />
        );
    };

    const handleAccount = (item) => {
        if (item === 'Change password') {
            // Auth.changePassword();
        } else if (item === 'Change email') {
            // Auth.changeEmail();
        } else if (item === 'Delete account') {
            
        }
    }

    return (
        <View style={styles.container}>
            <SectionList
                ItemSeparatorComponent={FlatListItemSeparator}
                sections={[
                    { title: 'Account', data: ['Change email', 'Change password', 'Enable workout notifications', 'Delete account'] },
                ]}

                renderItem = {({item, index, section}) => {
                    return (
                        <TouchableOpacity onPress={() => handleAccount(item)}>
                            <Text style={styles.item}>{item}</Text>
                        </TouchableOpacity>
                    );
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