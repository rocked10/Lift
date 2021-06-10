import React, { useState, useEffect } from 'react';
import {
    View, Text, Button, FlatList, TouchableOpacity,
    Modal, StatusBar, TouchableWithoutFeedback, Keyboard, StyleSheet, Alert
} from "react-native";
import { ListItem } from 'react-native-elements';
import { globalStyles, loginStyles } from "../styles/global";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from '@expo/vector-icons';
import Card from "../shared/card";
import WorkoutForm from "./workoutForm";
import firebaseApp from "../api/firebase";
import * as DB from '../api/database';
import * as Auth from '../api/auth.js';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';


export default function Workout({ navigation, route }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [userId, setUserId] = useState(Auth.getCurrentUserId());
    const [workouts, setWorkouts] = useState([]);

    const handleAddWorkout = (workout) => {
        DB.addWorkout(userId, workout).then();
        setModalOpen(false);
    }

    const handleEditWorkout = (workout) => {
        DB.editWorkout(Auth.getCurrentUserId(), workout.id, workout).then();
        setModalOpen2(false);
    }

    const handleDeleteWorkout = (workout) => {
        DB.deleteWorkout(Auth.getCurrentUserId(), workout.id).then();
    }

    useEffect(() => {
        return DB.subscribe(userId, setWorkouts);
    }, []);

    // why does () => handleEditWorkout(workout) work?????

    function EditWorkoutModal({ workout }) {
        return (
            <View style={{ padding: 8 }}>
                <Modal visible={modalOpen2} animationType='slide' >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.modalContent}>
                            <MaterialIcons
                                name='close'
                                size={26}
                                style={{ ...styles.modalToggle, ...styles.modalClose }}
                                onPress={() => setModalOpen2(false)}
                            />
                            <WorkoutForm
                                _workoutTitle={workout.workoutTitle}
                                _exercises={workout.exercises}
                                addWorkout={() => handleEditWorkout(workout)}
                                alreadyPreFilled={true}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        )
    }

    function AddWorkoutModal() {
        return (
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
        )
    }

    function DropDownSelection({ workout }) {
        return (
            <Menu>
                <MenuTrigger>
                    <Octicons name="kebab-horizontal" size={24} color="black" />
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption
                        onSelect={() => setModalOpen2(true)}
                        text='Edit Workout'
                    />
                    <MenuOption onSelect={() => Alert.alert(
                        '',
                        'Delete your workout?',
                        [
                            {
                                text: "Cancel",
                                // onPress: () => handleDeleteWorkout(workout),
                                style: "cancel",
                            },

                            {
                                text: "Delete",
                                onPress: () => handleDeleteWorkout(workout),
                                style: "delete",
                            }
                        ]
                    )}>
                        <Text style={{ color: 'red' }}>Delete</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        )
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.text}>Start Working Out!</Text>
            <Button title="Add Workout" onPress={() => setModalOpen(true)} />

            <AddWorkoutModal />

            <FlatList
                data={workouts ? Object.values(workouts) : null}
                renderItem={({ item, index }) => {
                    if (item.exercises !== undefined) {
                        let items = item.exercises.map(item2 => {
                            return (
                                <ListItem key={Math.random()}
                                    containerStyle={{ padding: 0, backgroundColor: '#eee' }}
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
                                    <View style={styles.cardHeader}>
                                        <Text style={globalStyles.titleText}>{item.workoutTitle}</Text>
                                        <View>
                                            <DropDownSelection workout={item} />
                                            <EditWorkoutModal workout={item} />
                                        </View>
                                    </View>
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
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});