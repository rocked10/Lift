import React, { useState } from 'react';
import { FlatList, Text, View, Button } from 'react-native';
import { globalStyles } from "../styles/global";
import Card from "../shared/card";
import * as DB from '../api/database';

export default function WorkoutDetails({ route, navigation }) {
    const { title, exercises } = route.params;

    const handleShare = () => {
        console.log("Button pressed!");
        const userId = DB.findUser('abc@gmail.com');
        console.log(userId);
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

            <Button title='Share with' onPress={handleShare}/>
        </View>
    )
}
