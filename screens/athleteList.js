import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Keyboard, Alert, } from "react-native";
import * as Auth from '../api/auth';
import * as DB from '../api/database';
import { Button, TextInput } from "react-native-paper"
import { set } from 'react-native-reanimated';
import ProfileCard from "../shared/profileCard";

export default function AthleteList() {
    const coachId = Auth.getCurrentUserId();

    const [coachProfile, setCoachProfile] = useState({});

    useEffect(() => {
        DB.getUserProfile(Auth.getCurrentUserId(), setCoachProfile);
    }, []);

    const [searchQuery, setSearchQuery] = useState('')

    const handleAddAthlete = async () => {
        // Keyboard.dismiss()
        const athlete = await DB.findUserId(searchQuery.toLowerCase().trim());
        if (athlete) {
            DB.addAthlete(coachId, athlete.id).then();
            Alert.alert(
                '',
                'Athlete added!',
                [
                    {
                        text: "Ok",
                    }
                ]
            );
            this.textInput.clear();
        } else {
            Alert.alert(
                '',
                'Athlete not found',
                [
                    {
                        text: "Ok",
                    }
                ]
            );
        }
    }

    const FlatListItemSeparator = () => {
        return (
          //Item Separator
          <View style={styles.listItemSeparatorStyle} />
        );
    };

    // why didn't it work when i placed the textinput and button outside??

    return (
        <View style={styles.container}>
            <TextInput placeholder="Enter Athlete's email" onChangeText={query => setSearchQuery(query)} ref={ input => { this.textInput = input }}/>
            <Button onPress={handleAddAthlete}>add</Button>
            <FlatList
                ItemSeparatorComponent={FlatListItemSeparator}
                data={coachProfile.athletes ? Object.values(coachProfile.athletes) : null}
                renderItem={
                    ({ item }) => (
                        // <TouchableOpacity>
                        //     <Text style={styles.item}>{item.id}</Text>
                        // </TouchableOpacity>

                        <ProfileCard title={item.name} subtitle='Athlete' />
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