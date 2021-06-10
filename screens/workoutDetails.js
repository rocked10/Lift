import React, {useEffect, useState} from 'react';
import { FlatList, Text, View, Button, TextInput,
    TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { globalStyles } from "../styles/global";
import {Modal, Portal, Provider, Searchbar} from 'react-native-paper';
import Card from "../shared/card";
import ShareWorkout from "./shareWorkout";
import * as DB from '../api/database';
import { MaterialIcons } from "@expo/vector-icons";
import WorkoutForm from "./workoutForm";

export default function WorkoutDetails({ route, navigation }) {
    const { title, exercises } = route.params;
    const [modalOpen, setModalOpen] = useState(false);
    const [role, setRole] = useState('');

    useEffect(() => {
        DB.getUserType(setRole);
    }, [role]);

    const ShareButton = ({onPress}) => {
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

    const WeightAndReps = ({tableData}) => {
        return (
            <FlatList 
                data={ tableData }
                renderItem={({ item }) => (
                    <View>
                        <Card>
                            <Text style={globalStyles.cardText}>
                                Set {item[0].row + 1} {item[0].value} kg {item[1].value} reps 
                            </Text>
                        </Card>
                    </View>
                )}
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
            <Text style={globalStyles.titleText}>{ title }</Text>
            <FlatList
                data={ exercises }
                renderItem={({ item }) => (
                    <View>
                        <Card>
                            <Text style={globalStyles.titleText}>
                                { item.exerciseName }
                            </Text>
                            <WeightAndReps tableData={chunkArray(item.tableData, 2)} />
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
                        <ShareWorkout shareId={handleShare}/>
                    </Modal>
                </Portal>
            </Provider>

            <ShareButton onPress={() => setModalOpen(true)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        height: 280,
        justifyContent: 'flex-start'
    }
});

