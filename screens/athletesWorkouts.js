import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Keyboard, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";
import { Searchbar } from 'react-native-paper';
import * as DB from "../api/database";
import Card from "../shared/card";
import ProfileCard from "../shared/profileCard";


export default function AthletesWorkouts({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [usersFound, setUsersFound] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [displayWorkouts, setDisplayWorkouts] = useState(false);

    const onChangeSearch = async (query) => {
        setSearchQuery(query);
        const users = await DB.findUserByName(query, 10);
        if (users) {
            setUsersFound(users);
        }

        if (! query) {
            setUsersFound([]);
            setDisplayWorkouts(false);
        }
    }

    const onSubmitSearch = async () => {
        Keyboard.dismiss();
        // const user = await DB.findUserId(searchQuery.toLowerCase().trim());
        // setUserFound(user);
        // setAthleteId(user.id);
    }

    const handleConfirmation = (id) => {
        setDisplayWorkouts(true);
        return DB.subscribe(id, setWorkouts);
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
                                _completionStatus: item.exercises.map(exercise => {
                                    let arr = [];
                                    for (let i = 0; i < exercise.tableData.length; i++) {
                                        arr.push(exercise.tableData[i].completed);
                                    }
                                    return arr;
                                    }),
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