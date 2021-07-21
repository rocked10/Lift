import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Alert, StyleSheet, TouchableOpacity, } from 'react-native';
import { globalStyles } from "../styles/global";
import { Modal, Portal, Provider, } from 'react-native-paper';
import Card from "../shared/card";
import ShareWorkout from "./shareWorkout";
import * as DB from '../api/database';
import * as Auth from '../api/auth';
import { Checkbox } from 'react-native-paper';
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import TimerModal from "../shared/TimerModal"

// REMEMBER TO UNCOMMENT ALL TIMER MODAL CODE!!!!!!!!!!!
// remarks section added to screen 
export default function WorkoutDetails({ route, navigation }) {
    const {
        workoutTitle,
        exercises,
        sharedBy,
        id,
        forViewingOnly,
        _completionStatus,
        forDownload,
    } = route.params;

    const [shareWorkoutModalOpen, setShareWorkoutModalOpen] = useState(false);
    const [userId, setUserId] = useState(Auth.getCurrentUserId());
    const [role, setRole] = useState('');
    const [remarks, setRemarks] = useState('');
    const [completionStatus, setCompletionStatus] = useState(_completionStatus);

    const [timerModalOpen, setTimerModalOpen] = useState(false);

    useEffect(() => {
        DB.getUserType(setRole);
    }, [role]);

    const TimerButton = ({ onPress, visible }) => {
        if (visible) {
            return (
                <MaterialCommunityIcons 
                    name="timer" 
                    size={26} 
                    color="black" 
                    onPress={onPress}  
                    style={! forViewingOnly ? {marginRight: 12} : {marginRight: 0}}
                />
            )
        } else {
            return null;
        }
    }

    const PlatesCalculatorButton = ({ onPress, visible }) => {
        if (visible) {
            return (
                <Entypo name="calculator" size={26} color="black" onPress={onPress} />
            )
        } else {
            return null;
        }
    }

    const ShareButton = ({ onPress, visible }) => {
        if (role === 'Coach' && visible) {
            return (
                <MaterialIcons
                    name='share'
                    size={26}
                    color='black'
                    onPress={onPress}
                    style={! forViewingOnly ? {marginRight: 12} : {marginRight: 0}}
                />
            );
        } else {
            return null;
        }
    }

    const handleShare = (shareId) => {
        console.log("SHARE");
        setShareWorkoutModalOpen(false);
        DB.addSharedWorkout(userId, shareId, id, route.params).then();
    }

    const ShareWorkoutModal = () => {
        return (
            <Provider>
                <Portal>
                    <Modal
                        visible={shareWorkoutModalOpen}
                        onDismiss={() => setShareWorkoutModalOpen(false)}
                        contentContainerStyle={styles.shareWorkoutModalContainer}
                    >
                        <ShareWorkout shareId={handleShare} />
                    </Modal>
                </Portal>
            </Provider>
        )
    }

    const DownloadButton = ({ onPress, visible }) => {
        if (visible) {
            return (
                <MaterialCommunityIcons
                    name='download'
                    size={26}
                    color='black'
                    onPress={onPress}
                />
            );
        } else {
            return null;
        }
    }

    const BackButton = ({ onPress, visible }) => {
        if (visible) {
            return (
                <MaterialCommunityIcons
                    name='arrow-left'
                    size={26}
                    color='black'
                    onPress={onPress}
                />
            );
        } else {
            return null;
        }
    }

    const handleDownload = () => {
        Alert.alert(
            "Download Workout",
            "Add this workout to your workout list?",
            [{ text: "Cancel", onPress: () => console.log("Cancel Pressed") },
            { text: "OK", onPress: () => DB.addWorkout(userId, route.params).then() }
            ]
        )
    }

    const WeightAndReps = ({ tableData, exerciseCategory, variation, exerciseName, exerciseNum }) => {
        if (forViewingOnly) {
            return (
                <FlatList
                    data={tableData}
                    renderItem={({ item, index }) => {
                        const label = exerciseCategory === 'Cardio'
                            ? "Set " + (item.set) + " " + (item.weight) + " km " + (item.reps) + " mins"
                            : variation === 'Bodyweight'
                                ? "Set " + (item.set) + " " + (item.reps) + " reps"
                                : "Set " + (item.set) + " " + (item.weight) + " kg " + (item.reps) + " reps"
                        return (
                            <View>
                                <Checkbox.Item
                                    label={label}
                                    labelStyle={globalStyles.cardText}
                                    status={completionStatus[exerciseNum][index] ? 'checked' : 'unchecked'}
                                    disabled={forViewingOnly}
                                />
                            </View>
                        )

                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            );
        } else {
            return (
                <FlatList
                    data={tableData}
                    renderItem={({ item, index }) => {
                        const label = exerciseCategory === 'Cardio'
                            ? "Set " + (item.set) + " " + (item.weight) + " km " + (item.reps) + " mins"
                            : variation === 'Bodyweight'
                                ? "Set " + (item.set) + " " + (item.reps) + " reps"
                                : "Set " + (item.set) + " " + (item.weight) + " kg " + (item.reps) + " reps"
                        return (
                            <View>
                                <Checkbox.Item
                                    label={label}
                                    labelStyle={globalStyles.cardText}
                                    status={completionStatus[exerciseNum][index] ? 'checked' : 'unchecked'}
                                    onPress={async () => {
                                        // insert set completion code here 
                                        setCompletionStatus(prev => {
                                            const newCompletionStatus = [...prev];
                                            newCompletionStatus[exerciseNum][index] = !newCompletionStatus[exerciseNum][index];
                                            DB.updateSetCompletionStatus(userId, id, exerciseName, item.set);
                                            if (sharedBy) {
                                                DB.updateSetCompletionStatus(sharedBy, id, exerciseName, item.set);
                                            }
                                            return newCompletionStatus;
                                        });

                                        // i know the same code is being reused elsewhere i'll create a function for this eventually...
                                        if (completionStatus[exerciseNum][index]) {
                                            const prevPR = await DB.getPR(userId, exerciseName)
                                            const currWeight = parseInt(item.weight);
                                            const currReps = parseInt(item.reps);
                                            let displayOnProfile = false;

                                            if (prevPR) {
                                                displayOnProfile = prevPR.displayOnProfile;
                                            }

                                            if (!prevPR || ((currWeight > parseInt(prevPR.weight)) && currWeight !== 0)) {
                                                console.log("hello")
                                                DB.addPR(userId, exerciseName, [currWeight, currReps], displayOnProfile);
                                            }
                                        }
                                    }}
                                    disabled={forViewingOnly}
                                />
                            </View>
                        )

                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            );
        }
    }

    function chunkArray(arr, n) {
        return arr.reduce((acc, item, index) => {
            const remainder = index % n;
            if (remainder === 0) return [...acc, [item]];
            const updatedArr = [...acc];
            const subArrIndexToUpdate = (index - remainder) / n;
            updatedArr[subArrIndexToUpdate] = [
                ...updatedArr[subArrIndexToUpdate],
                item,
            ];
            return updatedArr;
        }, []);
    }

    return (
        <View style={globalStyles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <BackButton onPress={() => navigation.goBack()} visible={forViewingOnly && !forDownload} />
                    <Text style={globalStyles.titleText}>{workoutTitle}</Text>
                </View>

                <View style={{ flexDirection: 'row', }}>
                    <ShareButton onPress={() => setShareWorkoutModalOpen(true)} visible={!forViewingOnly} />
                    <DownloadButton onPress={handleDownload} visible={forViewingOnly && forDownload} />
                    {/* <TimerButton onPress={() => { setTimerModalOpen(true); }} visible={!forViewingOnly} /> */}
                    <PlatesCalculatorButton onPress={() => { navigation.navigate('Plates Calculator') }} visible={!forViewingOnly} />
                </View>

            </View>

            <FlatList
                data={exercises}
                renderItem={({ item, index }) => (
                    <View>
                        <Card>
                            <TouchableOpacity onPress={async () => {
                                // console.log(item.exerciseName)
                                const exerciseObj = await DB.getExerciseByName(item.exerciseName)
                                if (exerciseObj) {
                                    // console.log(exerciseObj)
                                    navigation.navigate("ExerciseDescription", { exercise: exerciseObj })
                                }
                            }}>
                                <Text style={globalStyles.titleText}>
                                    {item.exerciseName}
                                </Text>
                            </TouchableOpacity>
                            <WeightAndReps tableData={item.tableData} exerciseCategory={item.exerciseCategory} variation={item.variation} exerciseName={item.exerciseName} exerciseNum={index} />
                        </Card>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            // ListFooterComponent={<TextInput
            //     multiline={true}
            //     label="Remarks"
            //     numberOfLines={4}
            //     onChangeText={setRemarks}
            //     value={remarks} />}
            />

            {/* <TimerModal
                isOpen={timerModalOpen}
                setTimerModalOpen={setTimerModalOpen}
            /> */}
            <ShareWorkoutModal />

        </View>
    )
}

const styles = StyleSheet.create({
    shareWorkoutModalContainer: {
        backgroundColor: 'white',
        padding: 20,
        height: 280,
        // justifyContent: 'flex-start'
    },
});




