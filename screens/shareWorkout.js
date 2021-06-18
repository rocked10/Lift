import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Searchbar } from 'react-native-paper';
import * as DB from "../api/database";


export default function ShareWorkout({ shareId = () => {} }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [userFound, setUserFound] = useState('');

    const ProfileCard = ({ item }) => {
        if (item) {
            return (
                <View style={{padding: 10}}>
                    <TouchableOpacity onPress={handleConfirmation}>
                        <Text>
                            {item}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return null;
        }
    }

    const onChangeSearch = (query) => {
        setSearchQuery(query);
    }

    const handleSearch = async () => {
        const uid = await DB.findUserId(searchQuery.toLowerCase().trim());
        console.log(searchQuery);
        setUserFound(uid);
    }

    const handleConfirmation = () => {
        Alert.alert(
            "",
            "Upload workout for this user?",
            [{ text: "Cancel", onPress: () => console.log("Cancel Pressed") },
                { text: "OK", onPress: () => shareId(userFound) }
                ]
        )
    }

    return (
        <View>
            <Searchbar
                placeholder='Search'
                onChangeText={onChangeSearch}
                value={searchQuery}
                onIconPress={handleSearch}
                onSubmitEditing={handleSearch}
            />

            <ProfileCard item={userFound}/>
        </View>
    );
}