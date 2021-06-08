import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Button, SectionList } from "react-native";
import { globalStyles } from "../styles/global";
import firebase from 'firebase';
import * as Auth from '../api/auth';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import CustomButton from '../shared/customButton'

export default function Settings() {
    // const userInfoFields = []

    const FlatListItemSeparator = () => {
        return (
          //Item Separator
          <View style={styles.listItemSeparatorStyle} />
        );
    };

    return (
        <View style={styles.container}>
            <SectionList
                ItemSeparatorComponent={FlatListItemSeparator}
                sections={[
                    { title: 'User Information', data: ['Username', 'Email', 'Name', 'City', 'State', 'Country', 'Bio'] },
                    { title: 'Fitness Information', data: ['Gender', 'Height', 'Weight'] },
                    { title: 'Account', data: ['Change password', 'Enable workout notifications', 'Delete account'] },
                ]}
                renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
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
        fontSize: 22,  
        fontWeight: 'bold',  
        color: "#fff",  
        backgroundColor: '#6495ed',  
    },  
    item: {  
        padding: 10,  
        fontSize: 18,  
        height: 44,  
    },
    listItemSeparatorStyle: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#C8C8C8',
    },  
})  