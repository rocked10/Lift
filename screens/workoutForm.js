import React, { useState } from 'react';
import { TextInput, View, Button, StatusBar, Text, FlatList, StyleSheet } from "react-native";
import ExerciseDetails from "../shared/exerciseDetails"
import CustomButton from "../shared/customButton"

export default function WorkoutForm({ addWorkout }) {
    const [workoutTitle, setWorkoutTitle] = useState('')

    const [exercises, setExercises] = useState([
        {
            exerciseName: '',
            tableData: [
                { row: 0, column: 0, value: 0 },
                { row: 0, column: 1, value: 0 },
            ]
        },
    ])

    const updateExerciseName = exerciseNum => name => {
        setExercises(prev => {
            const newExercises = [...prev]
            newExercises[exerciseNum].exerciseName = name

            return newExercises
        })
    }

    const addExercise = () => {
        setExercises(prev => {
            const newExercises = [...prev]
            newExercises.push({
                exerciseName: '',
                tableData: [
                    { row: 0, column: 0, value: 0 },
                    { row: 0, column: 1, value: 0 }
                ]
            })

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

    // exerciseNum is zero indexed starting from top of list 

    const addSet = exerciseNum => {
        const row = exercises[exerciseNum].tableData.length / 2;
        const columnOne = { row, column: 0, value: 0 };
        const columnTwo = { row, column: 1, value: 0 };
        setExercises(prev => {
            const newExercises = [...prev]
            newExercises[exerciseNum].tableData.push(columnOne, columnTwo)
            return newExercises
        })
    };

    const deleteSet = exerciseNum => row => {
        setExercises(prev => {
            const newExercises = [...prev]
            const newTableData = newExercises[exerciseNum].tableData.filter(cell => cell.row !== row)
            newExercises[exerciseNum].tableData = newTableData

            for (let i = 0; i < newTableData.length; i++) {
                newExercises[exerciseNum].tableData[i].row = Math.floor(i / 2)
            }

            return newExercises
        })
    }

    return (
        <View style={{ flex: 1, marginVertical: 10, padding: 8 }}>
            <TextInput
                style={styles.workoutTitle}
                onChangeText={(text) => { setWorkoutTitle(text) }}
                placeholder='Workout Title'
            />

            <FlatList
                data={exercises}
                keyExtractor={(item, index) => index}
                removeClippedSubviews={false}
                renderItem={({ item, index }) =>
                    <ExerciseDetails
                        tableData={item.tableData}
                        onUpdate={onUpdate(index)}
                        deleteSet={deleteSet(index)}
                        addSet={() => addSet(index)}
                        updateExerciseName={updateExerciseName(index)}
                    />
                }
            // stickyHeaderIndices={[0]}
            />


            <CustomButton title='add exercise' onPress={addExercise} />
            <CustomButton title='add workout' onPress={() => addWorkout({ workoutTitle, exercises })} />
        </View>

    );
}

const styles = StyleSheet.create({
    workoutTitle: {
        backgroundColor: '#d3d3d3',
        height: 40,
        width: '60%',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 14,
        alignSelf: 'center'
    },
})
