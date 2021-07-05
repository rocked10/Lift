import React, {useEffect, useState} from "react";
import { View, Alert, Keyboard, FlatList } from "react-native";
import { Searchbar, List } from 'react-native-paper';
import ProfileCard from "../shared/profileCard";

import * as DB from "../api/database";
import * as Auth from "../api/auth";


export default function ShareWorkout({ shareId }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [usersFound, setUsersFound] = useState('');
    const [userProfile, setUserProfile] = useState({});
    const [displayAthleteList, setDisplayAthleteList] = useState(true);

    useEffect(() => {
        DB.getUserProfile(Auth.getCurrentUserId(), setUserProfile);
    }, []);

    const AthleteList = ({ data, visible }) => {
        if (visible) {
            return (
                <View>
                    <List.Subheader style={{fontFamily: 'lato-bold', fontSize: 16}}>My Athletes</List.Subheader>

                    <FlatList
                        data={data}
                        renderItem={({item}) => (
                            <ProfileCard title={item.name} subtitle="Athlete" onPress={() => handleConfirmation(item.id)}/>
                        )}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            );
        } else {
            return null;
        }
    }

    const onChangeSearch = async (query) => {
        setSearchQuery(query);
        const user = await DB.findUserByName(query, 5);
        setUsersFound(user);
        setDisplayAthleteList(false);
        if (! query) {
            setUsersFound('');
            setDisplayAthleteList(true);
        }
    }

    const handleSearch = async () => {
        Keyboard.dismiss();
        // if (! searchQuery) {
        //     return null;
        // }
        // const res = await DB.findUserId(searchQuery.toLowerCase().trim());
        // console.log(searchQuery);
        // setUserFound(res);
        // setDisplayAthleteList(false);
    }

    const handleConfirmation = (id) => {
        Alert.alert(
            "",
            "Upload workout for this user?",
            [{ text: "Cancel", onPress: () => console.log("Cancel Pressed") },
                { text: "OK", onPress: () => shareId(id) }
                ]
        );
    }

    return (
        <View>
            <Searchbar
                placeholder='Search email'
                onChangeText={onChangeSearch}
                value={searchQuery}
                onIconPress={handleSearch}
                onSubmitEditing={handleSearch}
            />

            <FlatList
                keyboardShouldPersistTaps='handled'
                data={usersFound}
                renderItem={({ item }) => {
                    return (
                        <ProfileCard
                            title={item.name}
                            subtitle={item.role}
                            onPress={() => {
                                Keyboard.dismiss();
                                handleConfirmation(item.userId);
                            }}
                        />
                    );
                }}
                keyExtractor={(item) => item.userId}
            />

            <AthleteList data={userProfile.athletes ? Object.values(userProfile.athletes) : null} visible={displayAthleteList} />
        </View>
    );
}