import React, { useState } from 'react';
import {
    View, Text, Button, FlatList, TouchableOpacity,
    Modal, StatusBar, TouchableWithoutFeedback, Keyboard, StyleSheet
} from "react-native";
import { ListItem } from 'react-native-elements';
import { globalStyles, loginStyles } from "../styles/global";
import { MaterialIcons } from "@expo/vector-icons";
import Card from "../shared/card";
import WorkoutForm from "./workoutForm";

export default function Workout({ navigation, route }) {
    const [modalOpen, setModalOpen] = useState(false);

    const [workouts, setWorkouts] = useState([
        {
            workoutTitle: 'Crossfit',
            exercises: [
                {
                    exerciseName: 'Kipping pull-up',
                    tableData: [
                        { row: 0, column: 0, value: 1000 },
                        { row: 0, column: 1, value: 1000 },
                    ]
                },
                { 
                    exerciseName: 'Hip thrust', 
                    tableData: [
                        { row: 0, column: 0, value: 1000 },
                        { row: 0, column: 1, value: 1000 },
                    ]
                }
            ],
            key: '1'
        }
        // {title: 'Workout 2', exercises: [{
        //         exercise: 'test 3', sets: '4', reps: '6', weight: '100kg'
        //     }], key: '2'},
        // {title: 'Workout 3', exercises: [{
        //         exercise: 'test 4', sets: '4', reps: '6', weight: '100kg'
        //     }], key: '3'},
    ]);

    const addWorkout = (workout) => {
        workout.key = Math.floor(Math.random() * 100).toString();
        // console.log(workout);
        setWorkouts((currentWorkouts) => {
            const newWorkouts = [workout, ...currentWorkouts]
            // console.log(newWorkouts)
            return newWorkouts
        });
        // console.log(workouts)
        setModalOpen(false);
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.text}>Start Working Out!</Text>
            <Button title="Add Workout" onPress={() => setModalOpen(true)} />

            <View style={{ padding: 8 }}>
                <Modal visible={modalOpen} animationType='slide' >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.modalContent}>
                            <MaterialIcons
                                name='close'
                                size={26}
                                style={{ ...styles.modalToggle, ...styles.modalClose }}
                                onPress={() => setModalOpen(false)}
                            />

                            <WorkoutForm addWorkout={addWorkout} />
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>

            <FlatList
                data={workouts}
                renderItem={({ item }) => {
                    let items = item.exercises.map(item2 => {
                        return (
                            <ListItem key={Math.random()}
                                containerStyle={{ padding: 0, backgroundColor: '#eee' }}>
                                <Text style={globalStyles.cardText}>{item2.exercise}</Text>
                            </ListItem>
                        );
                    });

                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('WorkoutDetails', {
                            title: item.workoutTitle,
                            exercises: item.exercises,
                        })}>
                            <Card>
                                <Text style={globalStyles.titleText}>{item.workoutTitle}</Text>
                                {items}
                            </Card>
                        </TouchableOpacity>
                    );
                }}
            />

            <StatusBar />
        </View>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        flex: 1,
    },

    modalClose: {
        marginTop: 20,
        marginBottom: 0,
    },

    modalToggle: {
        alignSelf: 'center',
    }
});