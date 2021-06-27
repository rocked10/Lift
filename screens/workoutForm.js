import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Modal, TouchableWithoutFeedback, Keyboard, Text, Alert, } from "react-native";
import ExerciseDetails from "../shared/exerciseDetails"
import Exercises from "./exercises"
import { globalStyles } from "../styles/global";
import { Dialog, Button, Paragraph, TextInput } from "react-native-paper"

export default function WorkoutForm({ route, navigation }) {
    const { workout, addWorkout, createsANewWorkout, reusingWorkout, reusingTemplate } = route.params;

    const [workoutTitle, setWorkoutTitle] = useState(workout.workoutTitle)
    const [exercises, setExercises] = useState(workout.exercises)
    const [modalOpen, setModalOpen] = useState(false)
    const [formVisible, setFormVisible] = useState(true)


    useEffect(() => {
        if (reusingWorkout) {
            let temp = workout.exercises.map(exercise => {
                exercise.tableData = exercise.tableData.map(elem => { return { row: elem.row, column: elem.column, value: 0 } })
                return exercise;
            });
            setExercises(temp);
        } else if (reusingTemplate) {
            let temp = workout.exercises.map(exercise => {
                exercise.tableData = [
                    { row: 0, column: 0, value: 0 },
                    { row: 0, column: 1, value: 0 },
                ]
                return exercise;
            })
            setExercises(temp)
        }
    }, []);
    
    

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

    const updateExerciseName = exerciseNum => name => {
        setExercises(prev => {
            const newExercises = [...prev]
            newExercises[exerciseNum].exerciseName = name

            return newExercises
        })
    }

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
        let alertMessage = 'Please';
        let mistakes = 0;
        let connector = ' ';

        if (workoutTitle === '') {
            connector = mistakes >= 1 ? ' and ' : ' '
            alertMessage += connector + 'fill in a workout title' 
            mistakes++;
        }  

        if (exercises.length === 0) { 
            connector = mistakes >= 1 ? ' and ' : ' '
            alertMessage += connector + 'select at least one exercise';
            mistakes++;
        } 

        for (let i = 0; i < exercises.length; i++) {
            let zeroReps = false;
            for (let j = 0; j < exercises[i].tableData.length; j++) {
                if (exercises[i].tableData[j].value === 0 || exercises[i].tableData[j].value === '') {
                    connector = mistakes >= 1 ? ' and ' : ' '
                    alertMessage += connector + 'ensure reps are more than zero' 
                    mistakes++;
                    break;
                }
            }
            if (zeroReps) {
                break;
            }
        }

        Alert.alert(
            'Oops',
            alertMessage,
            [{text: "Ok",}]
        )           
        
        if (mistakes === 0) {
            // console.log("workout boutta be added")
            // console.log(exercises)
            // console.log("workout title is: " + workoutTitle)
            if (! createsANewWorkout) addWorkout({ id: workout.id, workoutTitle, exercises })
            else addWorkout({ workoutTitle, exercises })
            
            navigation.goBack()
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
                        updateExerciseName={updateExerciseName(index)}
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
