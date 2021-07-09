import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Modal, TouchableWithoutFeedback, Keyboard, Text, Alert, } from "react-native";
import ExerciseDetails from "../shared/exerciseDetails"
import Exercises from "./exercises"
import { globalStyles } from "../styles/global";
import { Button, TextInput } from "react-native-paper"
import * as DB from '../api/database';
import * as Auth from '../api/auth';

export default function WorkoutForm({ route, navigation }) {
    const { workout, addWorkout, createsANewWorkout, reusingWorkout, reusingTemplate } = route.params;

    const [workoutTitle, setWorkoutTitle] = useState(workout.workoutTitle)
    const [exercises, setExercises] = useState(workout.exercises)
    const [modalOpen, setModalOpen] = useState(false)
    const [formVisible, setFormVisible] = useState(true)
    const [userId, setUserId] = useState(Auth.getCurrentUserId());


    useEffect(() => {
        if (reusingTemplate) {
            let temp = workout.exercises.map(exercise => {
                exercise.tableData = [
                    { set: 1, weight: '', reps: '', completed: false }
                ]
                return exercise;
            })
            setExercises(temp)
        } else if (reusingWorkout) {
            let temp = workout.exercises.map(exercise => {
                let temp1 = exercise;
                temp1.tableData = temp1.tableData.map(row => { return { set: row.set, weight: row.weight, reps: row.reps, completed: false } })
                return temp1;
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
                                currentExercisesInForm={exercises}
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
    const updateExerciseVariation = exerciseNum => variation => {
        setExercises(prev => {
            const newExercises = [...prev]
            newExercises[exerciseNum].variation = variation

            return newExercises
        })
    }

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
                variation: '',
                tableData: [
                    { set: 1, weight: '', reps: '', completed: false }
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

    const onUpdate = exerciseNum => setNum => column => value =>
        setExercises(prev => {
            const newExercises = [...prev]
            if (column === 0) {
                newExercises[exerciseNum].tableData[setNum - 1].weight = value;
            } else {
                newExercises[exerciseNum].tableData[setNum - 1].reps = value;
            }

            return newExercises
        })

    const addSet = exerciseNum => {
        const setNum = exercises[exerciseNum].tableData.length + 1;
        setExercises(prev => {
            const newExercises = [...prev]

            console.log("adding set")
            console.log(newExercises);
            newExercises[exerciseNum].tableData.push({ set: setNum, weight: '', reps: '', completed: false })

            console.log(newExercises);
            return newExercises
        })
    };

    const deleteSet = exerciseNum => setNum => {
        if (exercises[exerciseNum].tableData.length == 1) {
            deleteExercise(exerciseNum)
        } else {
            setExercises(prev => {
                const newExercises = [...prev]

                console.log(newExercises);
                const newTableData = newExercises[exerciseNum].tableData.filter(row => row.set !== setNum)
                newExercises[exerciseNum].tableData = newTableData

                for (let i = 1; i <= newTableData.length; i++) {
                    newExercises[exerciseNum].tableData[i - 1].set = i;
                }

                console.log(newExercises);

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
            let inputIsZeroOrEmpty = false;
            for (let j = 0; j < exercises[i].tableData.length; j++) {
                if (exercises[i].tableData[j].weight === 0 || exercises[i].tableData[j].reps === '') {
                    connector = mistakes >= 1 ? ' and ' : ' '
                    alertMessage += connector + 'ensure reps/weight is more than zero'
                    mistakes++;
                    inputIsZeroOrEmpty = true;
                    break;
                }
            }
            if (inputIsZeroOrEmpty) {
                break;
            }
        }

        if (mistakes !== 0) {
            Alert.alert(
                'Oops',
                alertMessage,
                [{ text: "Ok", onPress: () => alertMessage = 'Please', }]
            )
        }

        if (mistakes === 0) {
            // console.log("workout boutta be added")
            // console.log(exercises)
            // console.log("workout title is: " + workoutTitle)
            if (!createsANewWorkout) {
                (async () => {
                    for (let i = 0; i < exercises.length; i++) {
                        for (let j = 0; j < exercises[i].tableData.length; j++) {
                            if (exercises[i].tableData[j].completed) {
                                const prevPR = await DB.getPR(userId, exercises[i].exerciseName)
                                const currWeight = parseInt(exercises[i].tableData[j].weight);
                                const currReps = parseInt(exercises[i].tableData[j].reps);
                                let displayOnProfile = false;

                                if (prevPR) {
                                    displayOnProfile = prevPR.displayOnProfile;
                                }

                                if (!prevPR || ((currWeight > parseInt(prevPR.weight)) && currWeight !== 0)) {
                                    DB.addPR(userId, exercises[i].exerciseName, [currWeight, currReps], displayOnProfile);
                                }
                            }
                        }
                    }
                })();

                addWorkout({ id: workout.id, workoutTitle, exercises, })
            } else addWorkout({ workoutTitle, exercises })

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

    const FooterComponent = () => {
        return (
            <View style={{marginTop: 10}}>
                <Button onPress={addExercise}>
                    <Text style={{ fontFamily: 'karla-bold' }}>ADD EXERCISE</Text>
                </Button>
                <SubmitButton />
            </View>
        )

    }

    return (
        <View style={globalStyles.modalContent}>
            <TextInput
                style={styles.workoutTitle}
                onChangeText={(text) => { setWorkoutTitle(text) }}
                placeholder='Workout Title'
                defaultValue={workoutTitle}
                theme={{ fonts: { regular: { fontFamily: 'lato-regular' } } }}
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
                        updateExerciseVariation={updateExerciseVariation(index)}
                        visible={formVisible}
                    />
                }
                ListFooterComponent={<FooterComponent />}
            // stickyHeaderIndices={[0]}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    workoutTitle: {
        fontSize: 18,
        height: 48,
    },
})
