import { ListItem } from "react-native-elements";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../styles/global";
import Card from "../shared/card";
import React, { useState, } from "react";
import * as DB from "../api/database";
import * as Auth from "../api/auth";


export default function AttachWorkout({ navigation, route }) {
    const [userId, setUserId] = useState(Auth.getCurrentUserId());
    const [workouts, setWorkouts] = useState(DB.subscribeOnce(userId));


    return (
        <View style={globalStyles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={workouts ? Object.values(workouts) : null}
                renderItem={({item, index}) => {
                    if (item.exercises !== undefined) {
                        let items = item.exercises.map(item2 => {
                            return (
                                <ListItem key={Math.random()}
                                          containerStyle={{padding: 0, backgroundColor: '#F5F5F5'}}
                                >
                                    <Text style={globalStyles.cardText}>{item2.exerciseName}</Text>
                                </ListItem>
                            );
                        });

                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.goBack();
                                    route.params.onSelect({
                                        workout: item,
                                    });
                                }}
                            >
                                <Card>
                                    <View style={styles.cardHeader}>
                                        <Text style={globalStyles.titleText}>{item.workoutTitle}</Text>
                                    </View>
                                    {items}
                                </Card>
                            </TouchableOpacity>
                        );
                    }
                }}
                keyExtractor={(item, index) => item + index}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});