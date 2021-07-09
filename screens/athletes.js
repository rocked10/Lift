import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, Alert, } from "react-native";
import * as Auth from '../api/auth';
import * as DB from '../api/database';
import { Button, TextInput } from "react-native-paper"
import ProfileCard from "../shared/profileCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Athletes({ navigation, route }) {
    const coachId = Auth.getCurrentUserId();

    const [coachProfile, setCoachProfile] = useState({});
    const textInputRef = useRef();

    useEffect(() => {
        DB.getUserProfile(Auth.getCurrentUserId(), setCoachProfile);
    }, []);

    const [searchQuery, setSearchQuery] = useState('')

    const handleAddAthlete = async () => {
        // Keyboard.dismiss()
        const athlete = await DB.findUserByEmail(searchQuery.toLowerCase().trim());
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
            textInputRef.current.clear();
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

    const handleDelete = (item) => {
        Alert.alert(
            "",
            `Remove ${item.name} from your list?`,
            [
                { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
                { text: "OK", onPress: () => { DB.deleteAthlete(Auth.getCurrentUserId(), item.id).then() }}
            ]
        );
    }

    // why didn't it work when i placed the textinput and button outside??

    return (
        <View style={styles.container}>
            <TextInput placeholder="Enter Athlete's email" onChangeText={query => setSearchQuery(query)} ref={textInputRef}/>
            <Button onPress={handleAddAthlete}>add</Button>
            <FlatList
                ItemSeparatorComponent={FlatListItemSeparator}
                data={coachProfile.athletes ? Object.values(coachProfile.athletes) : null}
                renderItem={
                    ({ item }) => (
                        <ProfileCard
                            title={item.name}
                            subtitle='Athlete'
                            right={() => {
                                return (
                                    <MaterialCommunityIcons
                                        onPress={() => handleDelete(item)}
                                        style={{marginRight: 10,}}
                                        name='close'
                                        size={20}
                                    />
                                );
                            }}
                            onPress={() => {
                                navigation.navigate('View Profile', {
                                    viewUser: item.id,
                                });
                            }}
                        />
                    )}
                keyExtractor={(item, index) => index}
            />
        </View>
    );
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