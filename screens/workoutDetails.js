import React, { useEffect, useState } from 'react';
import {
    FlatList, Text, View, Button,
    TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity, ScrollView
} from 'react-native';
import { globalStyles } from "../styles/global";
import { Modal, Portal, Provider, Searchbar, TextInput } from 'react-native-paper';
import Card from "../shared/card";
import ShareWorkout from "./shareWorkout";
import * as DB from '../api/database';
import * as Auth from '../api/auth';
import { Checkbox } from 'react-native-paper';
import { MaterialIcons } from "@expo/vector-icons";
import WorkoutForm from "./workoutForm";


export default function WorkoutDetails({ route, navigation }) {
    const { workoutTitle, exercises, completed, sharedBy, id, forViewingOnly } = route.params;
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
                <TouchableOpacity>
                    <MaterialIcons
                        name='share'
                        size={26}
                        color='black'
                        onPress={onPress}
                    />
                </TouchableOpacity>
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
                        const label = "Set " + (item[0].row + 1) + " " + (item[0].value) + " kg " + (item[1].value) + " reps"
                        return (
                            <View>
                                <Checkbox.Item
                                    label={label}
                                    labelStyle={globalStyles.cardText}
                                    status={completionStatus[exerciseNum][index] ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setCompletionStatus(prev => {
                                            const newCompletionStatus = [...prev];
                                            newCompletionStatus[exerciseNum][index] = !newCompletionStatus[exerciseNum][index];
                                            DB.updateSetCompletionStatus(userId, id, newCompletionStatus).then();
                                            if (sharedBy) {
                                                DB.updateSetCompletionStatus(sharedBy, id, newCompletionStatus).then();
                                            }
                                            return newCompletionStatus;
                                        })
                                    }
                                    }
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
            </View>


            <FlatList
                data={exercises}
                renderItem={({ item, index }) => (
                    <View>
                        <Card>
                            <Text style={globalStyles.titleText}>
                                {item.exerciseName}
                            </Text>
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




