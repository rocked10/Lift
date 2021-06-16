import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Button, SectionList, FlatList } from "react-native";
import * as Auth from '../api/auth';
import * as DB from '../api/database';

export default function AthleteList() {
    // const userInfoFields = []
    // const [username, setUsername] = useState('');

    // useEffect(() => {
    //     DB.getUserName(setUsername);
    // }, [])

    const FlatListItemSeparator = () => {
        return (
          //Item Separator
          <View style={styles.listItemSeparatorStyle} />
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                ItemSeparatorComponent={FlatListItemSeparator}
                data={['fakeAthlete 1', 'fakeAthlete 2']}
                renderItem={
                    ({ item }) => (
                        <TouchableOpacity>
                            <Text style={styles.item}>{item}</Text>
                        </TouchableOpacity>
                    )}
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