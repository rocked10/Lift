import React, { useState } from 'react';
import { View, FlatList, Keyboard, } from "react-native";
import { globalStyles } from "../styles/global";
import { Searchbar } from 'react-native-paper';
import * as DB from "../api/database";
import ProfileCard from "../shared/profileCard";

export default function AthletesWorkouts({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [usersFound, setUsersFound] = useState([]);

    const onChangeSearch = async (query) => {
        setSearchQuery(query);
        const users = await DB.findUserByName(query, 10);
        if (users) {
            setUsersFound(users);
        }

        if (!query) {
            setUsersFound([]);
        }
    }

    const onSubmitSearch = async () => {
        Keyboard.dismiss();
    }

    return (
        <View style={globalStyles.container}>
            <Searchbar
                placeholder="Search for an athlete..."
                value={searchQuery}
                onChangeText={onChangeSearch}
                onIconPress={onSubmitSearch}
                onSubmitEditing={onSubmitSearch}
            />

            <FlatList
                keyboardShouldPersistTaps='handled'
                data={usersFound}
                renderItem={({ item, index }) => {
                    return (
                        <ProfileCard
                            title={item.name}
                            subtitle={item.role}
                            onPress={async () => {
                                Keyboard.dismiss();
                                const workouts = await DB.subscribeOnceAsync(item.userId);
                                console.log(workouts); 
                                navigation.navigate("Athlete Workout List", {workouts: workouts, name: item.name})
                            }}
                        />
                    );
                }}
            keyExtractor={(item) => item.userId}
            />
        </View>
    );
}

