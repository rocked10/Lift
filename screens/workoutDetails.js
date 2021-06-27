import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from "../styles/global";
import { Modal, Portal, Provider, Searchbar, TextInput } from 'react-native-paper';
import Card from "../shared/card";
import ShareWorkout from "./shareWorkout";
import * as DB from '../api/database';
import * as Auth from '../api/auth';
import { Checkbox } from 'react-native-paper';
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import ExerciseDescription from "./exerciseDescription";


// remarks section added to screen 
export default function WorkoutDetails({ route, navigation }) {
    const { workoutTitle, exercises, completed, sharedBy, id, forViewingOnly, forDownload } = route.params;
    const [modalOpen, setModalOpen] = useState(false);
    const [userId, setUserId] = useState(Auth.getCurrentUserId());
    const [role, setRole] = useState('');
    const [completionStatus, setCompletionStatus] = useState(completed);
    const [remarks, setRemarks] = useState('');

    useEffect(() => {
        DB.getUserType(setRole);
    }, [role]);

    const ShareButton = ({ onPress, visible }) => {
        if (role === 'Coach' && visible) {
            return (
                <MaterialIcons
                    name='share'
                    size={26}
                    color='black'
                    onPress={onPress}
                />
            );
        } else {
            return null;
        }
    }

    const handleShare = (shareId) => {
        console.log("SHARE");
        setModalOpen(false);
        DB.addSharedWorkout(userId, shareId, id, route.params).then();
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

    const handleDownload = () => {
        Alert.alert(
            "Download Workout",
            "Add this workout to your workout list?",
            [{ text: "Cancel", onPress: () => console.log("Cancel Pressed") },
                { text: "OK", onPress: () => DB.addWorkout(userId, route.params).then() }
            ]
        )
    }

    const WeightAndReps = ({ tableData, exerciseNum }) => {
        if (forViewingOnly) {
            return (
                <FlatList
                    data={tableData}
                    renderItem={({ item, index }) => {
                        const label = "Set " + (item[0].row + 1) + " " + (item[0].value) + " kg " + (item[1].value) + " reps"
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
                        const label = "Set " + (item[0].row + 1) + ": " + (item[0].value) + " kg " + (item[1].value) + " reps"
                        return (
                            <View>
                                <Checkbox.Item
                                    label={label}
                                    labelStyle={globalStyles.cardText}
                                    status={completionStatus[exerciseNum][index] ? 'checked' : 'unchecked'}
                                    onPress={async () => {
                                        setCompletionStatus(prev => {
                                            const newCompletionStatus = [...prev];
                                            newCompletionStatus[exerciseNum][index] = !newCompletionStatus[exerciseNum][index];
                                            DB.updateSetCompletionStatus(userId, id, newCompletionStatus).then();
                                            if (sharedBy) {
                                                DB.updateSetCompletionStatus(sharedBy, id, newCompletionStatus).then();
                                            }
                                            return newCompletionStatus;
                                        });

                                        if (completionStatus[exerciseNum][index]) {
                                            const prevPR = await DB.getPR(userId, exercises[exerciseNum].exerciseName)
                                            console.log('hello')
                                            console.log(prevPR)
                                            const currWeight = item[0].value;
                                            const currReps = item[1].value;

                                            if (! prevPR || currWeight > prevPR[0]) {
                                                DB.addPR(userId, exercises[exerciseNum].exerciseName, [currWeight, currReps]);
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
                <Text style={globalStyles.titleText}>{workoutTitle}</Text>
                <ShareButton onPress={() => setModalOpen(true)} visible={!forViewingOnly} />
                <DownloadButton onPress={handleDownload} visible={forViewingOnly && forDownload} />
            </View>


            <FlatList
                data={exercises}
                renderItem={({ item, index }) => (
                    <View>
                        <Card>
                            <TouchableOpacity onPress={async () => {
                                console.log(item.exerciseName)
                                const exerciseObj = await DB.getExerciseByName(item.exerciseName)
                                if (exerciseObj) {
                                    console.log(exerciseObj)
                                    navigation.navigate("ExerciseDescription", { exercise: exerciseObj })
                                }
                            }}>
                                <Text style={globalStyles.titleText}>
                                    {item.exerciseName}
                                </Text>
                            </TouchableOpacity>
                            <WeightAndReps tableData={chunkArray(item.tableData, 2)} exerciseNum={index} />
                        </Card>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={<TextInput
                    multiline={true}
                    label="Remarks"
                    numberOfLines={4}
                    onChangeText={setRemarks}
                    value={remarks} />}
            />

            <Provider>
                <Portal>
                    <Modal
                        visible={modalOpen}
                        onDismiss={() => setModalOpen(false)}
                        contentContainerStyle={styles.modalContainer}
                    >
                        <ShareWorkout shareId={handleShare} />
                    </Modal>
                </Portal>
            </Provider>
        </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        height: 280,
        // justifyContent: 'flex-start'
    }
});




