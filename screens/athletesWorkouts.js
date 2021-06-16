import React, { useState, useEffect } from 'react';
import {
    View, Text, Button, FlatList, TouchableOpacity,
    Modal, StatusBar, TouchableWithoutFeedback, Keyboard, StyleSheet, Alert
} from "react-native";
import { globalStyles, loginStyles } from "../styles/global";
import { Searchbar } from 'react-native-paper';
import * as DB from "../api/database";
import * as Auth from '../api/auth.js';
import Card from "../shared/card";

export default function AthletesWorkouts({ navigation }) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [userFound, setUserFound] = useState('');
    const [athleteId, setAthleteId] = useState('');
    const [workouts, setWorkouts] = useState([]);
    const [displayWorkouts, setDisplayWorkouts] = useState(false);

    const onChangeSearch = query => {
        if (query === "") {
            setUserFound('');
            setDisplayWorkouts(false);
        } 
        setSearchQuery(query);  
    }
    const onSubmitSearch = () => {
        const uid = DB.findUserId(searchQuery.toLowerCase().trim());
        console.log(searchQuery);
        setUserFound(uid);
        setAthleteId(uid);
        console.log(uid);
    }

    const handleConfirmation = () => {
        setDisplayWorkouts(true);
        DB.subscribe(athleteId, setWorkouts);
    }

    const ListOfAthleteWorkouts = ({ displayWorkouts, workouts }) => {
        let workoutList = [];

        for (const workout in workouts) {
            const athleteWorkout = workouts[workout];
            workoutList.push(athleteWorkout)
        }

        if (displayWorkouts) {
            return (
                <FlatList
                    data={workoutList}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('Workout Details', {
                                workoutTitle: item.workoutTitle,
                                exercises: item.exercises,
                                completed: item.completed,
                                id: item.id,
                                forViewingOnly: true,
                        })}>
                            <Card>
                                <View style={styles.cardHeader}>
                                    <Text style={globalStyles.titleText}>{item.workoutTitle}</Text>
                                </View>
                            </Card>
                        </TouchableOpacity>

                    )}
                    keyExtractor={(item, index) => item + index}
                />
            )
        } else {
            return null
        }
    }

    const ProfileCard = ({ item }) => {
        if (item) {
            return (
                <View style={{ padding: 10 }}>
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

    return (
        <View>
            <Searchbar
                placeholder="Search for an athlete..."
                onChangeText={onChangeSearch}
                onIconPress={onSubmitSearch}
                value={searchQuery}
            />

            <ProfileCard item={userFound} />
            <ListOfAthleteWorkouts workouts={workouts} displayWorkouts={displayWorkouts} />
        </View>
    );
}

const styles = StyleSheet.create({
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});