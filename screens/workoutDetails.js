import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Button, StyleSheet } from 'react-native';
import { globalStyles } from "../styles/global";
import Card from "../shared/card";
import * as DB from '../api/database';

export default function WorkoutDetails({ route, navigation }) {
    const { title, exercises } = route.params;
    const [role, setRole] = useState('');
    
    let initCompletionStatus = []
    for (let i = 0; i < exercises.length; i++) {
        initCompletionStatus[i] = []
        for (let j = 0; j < (exercises[i].tableData.length) / 2; j++) {
            initCompletionStatus[i][j] = false
        }
    }

    console.log(initCompletionStatus)

    const [ completionStatus, setCompletionStatus ] = useState(initCompletionStatus);

    useEffect(() => {
        DB.getUserType(setRole);
    }, [role]);

    const handleShare = () => {
        console.log("Button pressed!");
    }

    const ShareButton = () => {
        if (role === 'Athlete') {
            return (
                <Button title='Share with' onPress={handleShare} />
            );
        } else {
            return null;
        }
    }

    const WeightAndReps = ({ tableData }) => {
        return (
            <FlatList
                data={tableData}
                renderItem={({ item }) => (
                    <View>

                        <Text style={globalStyles.cardText}>
                            Set {item[0].row + 1}: {item[0].value} kg {item[1].value} reps
                            {/* <CheckBox
                                value={isSelected}
                                onValueChange={setSelection}
                                style={styles.checkbox}
                            /> */}
                        </Text>

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
            <Text style={globalStyles.titleText}>{title}</Text>
            <FlatList
                data={exercises}
                renderItem={({ item }) => (
                    <View>
                        <Card>
                            <Text style={globalStyles.titleText}>
                                {item.exerciseName}
                            </Text>
                            <WeightAndReps tableData={chunkArray(item.tableData, 2)} />
                        </Card>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />

            <ShareButton />
        </View>
    )
}

const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   alignItems: "center",
    //   justifyContent: "center",
    // },
    // checkboxContainer: {
    //   flexDirection: "row",
    //   marginBottom: 20,
    // },
    checkbox: {
      alignSelf: "center",
    },
    // label: {
    //   margin: 8,
    // },
});
  