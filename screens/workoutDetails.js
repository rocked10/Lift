import React, { useEffect, useState } from 'react';
import {
    FlatList, Text, View, Button, TextInput,
    TouchableWithoutFeedback, Keyboard, StyleSheet
} from 'react-native';
import { globalStyles } from "../styles/global";
import { Modal, Portal, Provider, Searchbar } from 'react-native-paper';
import Card from "../shared/card";
import ShareWorkout from "./shareWorkout";
import * as DB from '../api/database';
import { Checkbox } from 'react-native-paper';
import { MaterialIcons } from "@expo/vector-icons";
import WorkoutForm from "./workoutForm";

export default function WorkoutDetails({ route, navigation }) {
    const { title, exercises } = route.params;
    const [modalOpen, setModalOpen] = useState(false);
    const [role, setRole] = useState('');

    let initCompletionStatus = []
    for (let i = 0; i < exercises.length; i++) {
        initCompletionStatus[i] = []
        for (let j = 0; j < ((exercises[i].tableData.length) / 2); j++) {
            initCompletionStatus[i][j] = false
        }
    }

    const [completionStatus, setCompletionStatus] = useState(initCompletionStatus);

    useEffect(() => {
        DB.getUserType(setRole);
    }, [role]);

    const ShareButton = ({ onPress }) => {
        if (role === 'Athlete') {
            return (
                <Button title='Share with' onPress={onPress} />
            );
        } else {
            return null;
        }
    }

    const handleShare = (shareId) => {
        console.log("SHARE");
        setModalOpen(false);
        DB.addWorkout(shareId, route.params).then();
    }

    const WeightAndReps = ({ tableData, exerciseNum }) => {
        return (
            <FlatList
                data={tableData}
                renderItem={({ item, index }) => {
                    const label = "Set " + (item[0].row + 1) + " " + (item[0].value) + " kg " +  (item[1].value) + " reps"
                    return (
                        <View>
                            <Checkbox.Item 
                                label={label} 
                                labelStyle={globalStyles.cardText}
                                status={completionStatus[exerciseNum][index] ? 'checked' : 'unchecked'} 
                                onPress={() => {
                                    setCompletionStatus(prev => {
                                        const newCompletionStatus = [...prev]
                                        newCompletionStatus[exerciseNum][index] = !newCompletionStatus[exerciseNum][index]
                                        console.log(newCompletionStatus)
                                        return newCompletionStatus
                                    })
                                }}     
                            />
                        </View>
                    )

                }}
                keyExtractor={(item, index) => index.toString()}
            />
        );
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
            <Text style={globalStyles.titleText}>{title}</Text>
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

            <ShareButton onPress={() => setModalOpen(true)} />
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




