import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";
import Card from "../shared/card";
import * as Auth from '../api/auth';
import * as DB from '../api/database'
import { MaterialCommunityIcons, } from "@expo/vector-icons";

export default function AthleteWorkoutList({ route, navigation }) {
    const { workouts, name } = route.params
    let workoutList = [];

    for (const workout in workouts) {
        const athleteWorkout = workouts[workout];
        workoutList.push(athleteWorkout)
    }

    return (
        <View style={globalStyles.container} >

            <View style={{flexDirection: 'row'}}>
                <MaterialCommunityIcons
                    name='arrow-left'
                    size={26}
                    color='black'
                    onPress={() => navigation.goBack()}
                />

                <Text style={globalStyles.titleText}>{name}'s Workouts</Text>
            </View>

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
        </View>

    )
}

const styles = StyleSheet.create({
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});