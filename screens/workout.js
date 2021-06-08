import React, { useState, useEffect } from 'react';
import {
    View, Text, Button, FlatList, TouchableOpacity,
    Modal, StatusBar, TouchableWithoutFeedback, Keyboard, StyleSheet
} from "react-native";
import { ListItem } from 'react-native-elements';
import { globalStyles, loginStyles } from "../styles/global";
import { MaterialIcons } from "@expo/vector-icons";
import Card from "../shared/card";
import WorkoutForm from "./workoutForm";
import firebaseApp from "../api/firebase";
import * as DB from '../api/database';
import * as Auth from '../api/auth.js'

export default function Workout({ navigation, route }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [userId, setUserId] = useState(Auth.getCurrentUserId());
    const [workouts, setWorkouts] = useState([]);

    const handleAddWorkout = (workout) => {
        DB.addWorkout(userId, workout);
        setModalOpen(false);
    }

    useEffect(() => {
        return DB.subscribe(userId, setWorkouts);
    }, []);

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
                            <WorkoutForm addWorkout={handleAddWorkout} />
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>

            <FlatList
                data={workouts ? Object.values(workouts) : null}
                renderItem={({ item }) => {
                    if (item.exercises !== undefined) {
                        let items = item.exercises.map(item2 => {
                            return (
                                <ListItem key={Math.random()}
                                          containerStyle={{padding: 0, backgroundColor: '#eee'}}
                                >
                                    <Text style={globalStyles.cardText}>{item2.exerciseName}</Text>
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
                    }
                }}
                keyExtractor={(item, index) => item + index}
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