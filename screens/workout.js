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
import WorkoutFormModal from "../shared/workoutFormModal"

export default function Workout({ navigation, route }) {
    const [addWorkoutModalOpen, setAddWorkoutModalOpen] = useState(false);
    const [editWorkoutModalOpen, setEditWorkoutModalOpen] = useState(false);
    const [userId, setUserId] = useState(Auth.getCurrentUserId());
    const [workouts, setWorkouts] = useState([]);
    const [idOfWorkoutBeingEdited, setIdOfWorkoutBeingEdited] = useState(-1)
    const [workoutBeingReused, setWorkoutBeingReused] = useState(false)
    const [role, setRole] = useState('');

    useEffect(() => {
        DB.getUserType(setRole);
    }, [role]);

    const handleAddWorkout = (workout) => {
        // Adding completion status
        let completed = []
        workout.exercises.forEach((item) => {
            completed.push(new Array(item.tableData.length / 2));
        });
        completed.map((arr) => arr.fill(false));
        workout.completed = completed;

        DB.addWorkout(userId, workout).then();
        if (workoutBeingReused) {
            setWorkoutBeingReused(false);
            setEditWorkoutModalOpen(false);
            setIdOfWorkoutBeingEdited(-1);
        } else {
            setAddWorkoutModalOpen(false);
        }
    }

    const handleEditWorkout = (workout) => {
        DB.editWorkout(Auth.getCurrentUserId(), idOfWorkoutBeingEdited, workout).then();
        setEditWorkoutModalOpen(false);
        setIdOfWorkoutBeingEdited(-1)
    }

    const handleDeleteWorkout = (workout) => {
        DB.deleteWorkout(Auth.getCurrentUserId(), workout.id).then();
    }

    useEffect(() => {
        return DB.subscribe(userId, setWorkouts);
    }, []);

    function EditWorkoutModal() {
        if (workouts != null && idOfWorkoutBeingEdited != -1) {
            const workout = workouts[idOfWorkoutBeingEdited]
            console.log(workout)

            let submissionHandler = '';
            let createsANewWorkout = false;

            if (workoutBeingReused) {
                submissionHandler = handleAddWorkout
                createsANewWorkout = true
            } else {
                submissionHandler = handleEditWorkout
            }

            return (
                <WorkoutFormModal
                    modalOpen={editWorkoutModalOpen}
                    setModalOpen={setEditWorkoutModalOpen}
                    workoutTitle={workout.workoutTitle}
                    exercises={workout.exercises}
                    addWorkout={submissionHandler}
                    createsANewWorkout={createsANewWorkout}
                />
            )
        } else {
            return null;
        }
    }

    function AddWorkoutModal() {
        return (
            <WorkoutFormModal
                modalOpen={addWorkoutModalOpen}
                setModalOpen={setAddWorkoutModalOpen}
                addWorkout={handleAddWorkout}
            />
        )
    }

    function DropDownSelection({ workout }) {
        return (
            <Menu>
                <MenuTrigger hitSlop={{top: 20, bottom: 20, left: 60, right: 50}} >
                    <Octicons name="kebab-horizontal" size={26} color="black" />
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyles}>
                    <MenuOption
                        customStyles={optionStyles}
                        onSelect={() => { console.log(workout.id); setEditWorkoutModalOpen(true); setIdOfWorkoutBeingEdited(workout.id); }}
                        text='Edit Workout'
                    />
                    <MenuOption
                        customStyles={optionStyles}
                        onSelect={() => { setEditWorkoutModalOpen(true); setIdOfWorkoutBeingEdited(workout.id); setWorkoutBeingReused(true); }}
                        text='Reuse Workout'
                    />
                    <MenuOption
                        onSelect={() => Alert.alert(
                            '',
                            'Delete your workout?',
                            [
                                {
                                    text: "Cancel",
                                    style: "cancel",
                                },

                                {
                                    text: "Delete",
                                    onPress: () => handleDeleteWorkout(workout),
                                    style: "delete",
                                }
                            ]
                        )}
                        customStyles={optionStyles}
                    >
                        <Text style={{ color: 'red' }}>Delete</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        )
    }

    return (
        <View style={globalStyles.container}>
            <TouchableOpacity
                onPress={() => setAddWorkoutModalOpen(true)}
            >
                <MaterialIcons name='add' size={28}/>
            </TouchableOpacity>

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
                                workoutTitle: item.workoutTitle,
                                exercises: item.exercises,
                                completed: item.completed,
                                id: item.id,
                            })}>
                                <Card>
                                    <View style={styles.cardHeader}>
                                        <Text style={globalStyles.titleText}>{item.workoutTitle}</Text>
                                        <DropDownSelection workout={item} />
                                    </View>
                                    {items}
                                </Card>
                            </TouchableOpacity>
                        );
                    }
                }}
                keyExtractor={(item, index) => item + index}
            />

            <EditWorkoutModal />

            <StatusBar />

        </View>

    );
}

const styles = StyleSheet.create({
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

const optionsStyles = {
    optionsContainer: {
        backgroundColor: '#f5f5f5',
        width: 160,
        borderRadius: 4,
        padding: 4,
    },
};

const optionStyles = {
    optionText: {
        color: 'black',
        fontWeight: 'bold'
    },
};
