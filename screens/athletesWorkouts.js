import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Keyboard, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";
import { Searchbar } from 'react-native-paper';
import * as DB from "../api/database";
import Card from "../shared/card";
import ProfileCard from "../shared/profileCard";


export default function AthletesWorkouts({ navigation }) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [userFound, setUserFound] = useState('');
    const [athleteId, setAthleteId] = useState('');
    const [workouts, setWorkouts] = useState([]);
    const [displayWorkouts, setDisplayWorkouts] = useState(false);

    const onChangeSearch = (query) => {
        if (query === "") {
            setUserFound('');
            setDisplayWorkouts(false);
        } 
        setSearchQuery(query);  
    }

    const onSubmitSearch = async () => {
        Keyboard.dismiss();
        const user = await DB.findUserId(searchQuery.toLowerCase().trim());
        setUserFound(user);
        setAthleteId(user.id);
    }

    const handleConfirmation = () => {
        setDisplayWorkouts(true);
        return DB.subscribe(athleteId, setWorkouts);
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

    const ProfileCardConditional = ({ item }) => {
        if (item) {
            return (
                <View style={{ padding: 8 }}>
                    <ProfileCard title={item} subtitle="Athlete" onPress={handleConfirmation}/>
                </View>
            );
        } else {
            return null;
        }
    }

    return (
        <View style={globalStyles.container}>
            <Searchbar
                placeholder="Search for an athlete via email..."
                value={searchQuery}
                onChangeText={onChangeSearch}
                onIconPress={onSubmitSearch}
                onSubmitEditing={onSubmitSearch}
            />

            <ProfileCardConditional item={userFound.name} />
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