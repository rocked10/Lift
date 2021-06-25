import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Modal, TouchableWithoutFeedback, Keyboard, Text } from "react-native";
import ExerciseDetails from "../shared/exerciseDetails"
import Exercises from "./exercises"
import { globalStyles } from "../styles/global";
import { TextInput } from "react-native-paper"
import { Button } from 'react-native-paper'

export default function WorkoutForm({
    _workoutTitle,
    _exercises,
    addWorkout,
    createsANewWorkout,
    showDialog
}) {
    const [workoutTitle, setWorkoutTitle] = useState(_workoutTitle)
    const [exercises, setExercises] = useState(_exercises)
    const [modalOpen, setModalOpen] = useState(false)
    const [formVisible, setFormVisible] = useState(true)

    const ExerciseLibraryModal = () => {
        return (
            <View style={{ padding: 8 }}>
                <Modal visible={modalOpen} animationType='slide' >
                    {/* <MaterialIcons
                        name='close'
                        size={26}
                        style={{ ...globalStyles.modalToggle, ...globalStyles.modalClose }}
                        onPress={() => setModalOpen(false)}
                    /> */}
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={globalStyles.modalContent}>
                            <Exercises
                                cameFromWorkoutForm={true}
                                onSelectExercise={exerciseObj => {
                                    handleSelect(exercises.length - 1)(exerciseObj);
                                }}
                                setModalOpen={setModalOpen}
                                setFormVisible={setFormVisible}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        )
    }

    // exerciseNum is zero indexed starting from top of exercises list 

    const handleSelect = exerciseNum => exerciseObj => {
        setExercises(prev => {
            const newExercises = [...prev]
            newExercises[exerciseNum].exerciseName = exerciseObj.exerciseName
            newExercises[exerciseNum].exerciseCategory = exerciseObj.category

            return newExercises;
        })
    }

    const addExercise = () => {
        // sets visibility of exercise library modal to be true and opens it up
        setModalOpen(true);
        setFormVisible(false);

        setExercises(prev => {
            const newExercises = [...prev]
            newExercises.push({
                exerciseName: '',
                exerciseCategory: '',
                tableData: [
                    { row: 0, column: 0, value: '' },
                    { row: 0, column: 1, value: '' }
                ]
            })

            return newExercises
        });
    }

    const deleteExercise = exerciseNum => {
        setExercises(prev => {
            const newExercises = [...prev]
            newExercises.splice(exerciseNum, 1)

            return newExercises
        });
    }

    const onUpdate = exerciseNum => row => column => value =>
        setExercises(prev => {
            const newExercises = [...prev]
            newExercises[exerciseNum].tableData = newExercises[exerciseNum].tableData.map(cell =>
            ((cell.row === row && cell.column === column)
                ? { row, column, value }
                : cell))

            return newExercises
        })

    const addSet = exerciseNum => {
        const row = exercises[exerciseNum].tableData.length / 2;
        const columnOne = { row, column: 0, value: '' };
        const columnTwo = { row, column: 1, value: '' };
        setExercises(prev => {
            const newExercises = [...prev]
            newExercises[exerciseNum].tableData.push(columnOne, columnTwo)
            return newExercises
        })
    };

    const deleteSet = exerciseNum => row => {
        if (exercises[exerciseNum].tableData.length == 2) {
            deleteExercise(exerciseNum)
        } else {
            setExercises(prev => {
                const newExercises = [...prev]

                const newTableData = newExercises[exerciseNum].tableData.filter(cell => cell.row !== row)
                newExercises[exerciseNum].tableData = newTableData

                for (let i = 0; i < newTableData.length; i++) {
                    newExercises[exerciseNum].tableData[i].row = Math.floor(i / 2)
                }

                return newExercises
            }

            )
        }
    }

    const submissionHandler = () => {
        if (exercises.length === 0 || workoutTitle === '') {
            showDialog()
        } else {
            addWorkout({ workoutTitle, exercises })
        }
    }

    const SubmitButton = () => {
        if (createsANewWorkout) {
            return (
                <Button onPress={submissionHandler}>
                    <Text style={{ fontFamily: 'karla-bold' }}>ADD WORKOUT</Text>
                </Button>
            )
        } else {
            return (
                <Button onPress={submissionHandler}>
                    <Text style={{ fontFamily: 'karla-bold' }}>SAVE WORKOUT</Text>
                </Button>
            )
        }
    }

    return (
        <View style={globalStyles.modalContent}>
            <TextInput
                style={styles.workoutTitle}
                onChangeText={(text) => { setWorkoutTitle(text) }}
                placeholder='Workout Title'
                defaultValue={workoutTitle}
                theme={{ fonts: { regular: {fontFamily: 'lato-regular' }} }}
            />

            <ExerciseLibraryModal />

            <FlatList
                showsVerticalScrollIndicator={false}
                data={exercises}
                keyExtractor={(item, index) => index}
                // showsVerticalScrollIndicator={false}
                removeClippedSubviews={false}
                renderItem={({ item, index }) =>
                    <ExerciseDetails
                        exerciseName={item.exerciseName}
                        exerciseCategory={item.exerciseCategory}
                        tableData={item.tableData}
                        onUpdate={onUpdate(index)}
                        deleteExercise={() => deleteExercise(index)}
                        deleteSet={deleteSet(index)}
                        addSet={() => addSet(index)}
                        // updateExerciseName={updateExerciseName(index)}
                        visible={formVisible}
                    />
                }
            // stickyHeaderIndices={[0]}
            />

            <Button onPress={addExercise}>
                <Text style={{ fontFamily: 'karla-bold' }}>ADD EXERCISE</Text>
            </Button>
            <SubmitButton />

        </View>

    );
}

const styles = StyleSheet.create({
    workoutTitle: {
        fontSize: 18,
        height: 48,
    },
})
