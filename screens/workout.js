import React, { useState, useEffect } from 'react';
import {
    View, Text, Button, FlatList, TouchableOpacity,
    Modal, StatusBar, TouchableWithoutFeedback, Keyboard, StyleSheet, Alert, SectionList
} from "react-native";
import { List } from "react-native-paper";
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
    const [workouts, setWorkouts] = useState({});
    const [sectionedWorkouts, setSectionedWorkouts] = useState([]);
    const [idOfWorkoutBeingEdited, setIdOfWorkoutBeingEdited] = useState(-1)
    const [workoutBeingReused, setWorkoutBeingReused] = useState(false)
    const [templateBeingReused, setTemplateBeingReused] = useState(false)
    const [role, setRole] = useState('');

    useEffect(() => {
        DB.getUserType(setRole);
    }, [role]);

    useEffect(() => {
        return DB.subscribe(userId, setWorkouts);
    }, []);

    useEffect(() => {
         if (workouts) {
             const sortedWorkouts = [];
             const workoutArray = Object.values(workouts).reverse();
             const completedWorkouts = workoutArray.filter((workout) => workout.completed.every(i => i.every(j => j === true) === true));
             const pendingWorkouts = workoutArray.filter((workout) => ! workout.completed.every(i => i.every(j => j === true) === true));

             if (completedWorkouts.length > 0) {
                 sortedWorkouts.push({ title: 'Completed', data: completedWorkouts });
             }
             if (pendingWorkouts.length > 0) {
                 sortedWorkouts.push({ title: 'Pending', data: pendingWorkouts });
             }

             setSectionedWorkouts(sortedWorkouts);
         }
    }, [workouts]);

    const addCompletionStatus = (workout) => {
        let completed = [];
        workout.exercises.forEach((item) => {
            completed.push(new Array(item.tableData.length / 2));
        });
        completed.map((arr) => arr.fill(false));
        workout.completed = completed;
        return workout;
    }

    const handleAddWorkout = (workout) => {
        // Adding completion status
        const newWorkout = addCompletionStatus(workout);

        DB.addWorkout(userId, newWorkout).then();
        if (workoutBeingReused || templateBeingReused) {
            setEditWorkoutModalOpen(false);
            setIdOfWorkoutBeingEdited(-1);
            if (workoutBeingReused) setWorkoutBeingReused(false);
            else setTemplateBeingReused(false);
        } else {
            setAddWorkoutModalOpen(false);
        }
    }

    const handleEditWorkout = (workout) => {
        const newWorkout = addCompletionStatus(workout);

        DB.editWorkout(Auth.getCurrentUserId(), idOfWorkoutBeingEdited, newWorkout).then();
        setEditWorkoutModalOpen(false);
        setIdOfWorkoutBeingEdited(-1);
    }

    const handleDeleteWorkout = (workout) => {
        DB.deleteWorkout(Auth.getCurrentUserId(), workout.id).then();
    }

    function EditWorkoutModal() {
        if (workouts != null && idOfWorkoutBeingEdited != -1) {
            const workout = workouts[idOfWorkoutBeingEdited]

            let submissionHandler = '';
            let createsANewWorkout = false;
            let exercises = '';

            if (workoutBeingReused || templateBeingReused) {
                submissionHandler = handleAddWorkout
                createsANewWorkout = true

                if (workoutBeingReused) {
                    exercises = workout.exercises.map(exercise => {
                        exercise.tableData = exercise.tableData.map(elem => {return { row: elem.row, column : elem.column, value: 0}})
                        return exercise;  
                    })
                } else {
                    exercises = workout.exercises.map(exercise => {
                        exercise.tableData = [
                            { row: 0, column: 0, value: 0 },
                            { row: 0, column: 1, value: 0 },
                        ]
                        return exercise;  
                    })
                }
            } else {
                submissionHandler = handleEditWorkout
                exercises = workout.exercises;
            }

            return (
                <WorkoutFormModal
                    modalOpen={editWorkoutModalOpen}
                    setModalOpen={setEditWorkoutModalOpen}
                    workoutTitle={workout.workoutTitle}
                    exercises={exercises}
                    addWorkout={submissionHandler}
                    createsANewWorkout={createsANewWorkout}
                    usesExistingWorkout={true}
                />
            );
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
        );
    }

    function DropDownSelection({ workout }) {
        return (
            <Menu>
                <MenuTrigger hitSlop={{top: 20, bottom: 50, left: 60, right: 50}} >
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
                        customStyles={optionStyles}
                        onSelect={() => { setEditWorkoutModalOpen(true); setIdOfWorkoutBeingEdited(workout.id); setTemplateBeingReused(true); }}
                        text='Reuse Template'
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
                style={{alignItems: 'flex-end'}}
                onPress={() => setAddWorkoutModalOpen(true)}
            >
                <MaterialIcons name='add' size={28} />
            </TouchableOpacity>

            <AddWorkoutModal />

            <SectionList
                showsVerticalScrollIndicator={false}
                renderSectionHeader={({section: {title}}) => <List.Subheader style={{fontFamily: 'lato-bold'}}>{title} workouts</List.Subheader>}
                sections={sectionedWorkouts}
                renderItem={({ item, index }) => {
                    if (item.exercises !== undefined) {
                        let items = item.exercises.map(item2 => {
                            return (
                                <ListItem key={Math.random()}
                                    containerStyle={{ padding: 0, backgroundColor: '#F5F5F5' }}
                                >
                                    <Text style={globalStyles.cardText}>{item2.exerciseName}</Text>
                                </ListItem>
                            );
                        });
                        
                        // console.log("--------------------------------------------")
                        // console.log(workouts)
                        // console.log(item.exercises)

                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('Workout Details', { 
                                workoutTitle: item.workoutTitle,
                                exercises: item.exercises,
                                completed: item.completed,
                                id: item.id,
                                forViewingOnly: false, 
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
