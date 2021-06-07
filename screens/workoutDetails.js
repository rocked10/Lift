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

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.titleText}>{ title }</Text>
            <FlatList
                data={ exercises }
                renderItem={({ item }) => (
                    <View>
                        <Card>
                            <Text style={globalStyles.titleText}>
                                { item.exercise }
                            </Text>
                            <Text style={globalStyles.cardText}>
                                { item.sets } x { item.reps } { item.weight }
                            </Text>
                        </Card>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />

            <Button title='Share with' onPress={handleShare}/>
        </View>
    )
}
