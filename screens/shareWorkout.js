import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity, Alert, Keyboard, FlatList } from "react-native";
import { Searchbar, List } from 'react-native-paper';
import * as DB from "../api/database";
import * as Auth from "../api/auth";


export default function ShareWorkout({ shareId = () => {} }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [userFound, setUserFound] = useState('');
    const [userProfile, setUserProfile] = useState({});
    const [displayAthleteList, setDisplayAthleteList] = useState(true);

    useEffect(() => {
        DB.getUserProfile(Auth.getCurrentUserId(), setUserProfile);
    }, []);

    const ProfileCard = ({ item }) => {
        if (item) {
            return (
                <View style={{padding: 10}}>
                    <TouchableOpacity onPress={() => handleConfirmation(item.id)}>
                        <Text style={{fontSize: 16, fontFamily: 'lato-regular'}}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return null;
        }
    }

    const AthleteList = ({ data, visible }) => {
        if (visible) {
            return (
                <View>
                    <List.Subheader style={{fontFamily: 'lato-bold', fontSize: 16}}>My Athletes</List.Subheader>

                    <FlatList
                        data={data}
                        renderItem={({item}) => <ProfileCard item={item} />}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            );
        } else {
            return null;
        }
    }

    const onChangeSearch = (query) => {
        if (! query) {
            setDisplayAthleteList(true);
            setUserFound('');
        }
        setSearchQuery(query);
    }

    const handleSearch = async () => {
        Keyboard.dismiss();
        if (! searchQuery) {
            return null;
        }
        const res = await DB.findUserId(searchQuery.toLowerCase().trim());
        console.log(searchQuery);
        setUserFound(res);
        setDisplayAthleteList(false);
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

            <ProfileCard item={userFound}/>

            <AthleteList data={userProfile.athletes ? Object.values(userProfile.athletes) : null} visible={displayAthleteList} />
        </View>
    );
}