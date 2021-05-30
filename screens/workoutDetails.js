import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { globalStyles } from "../styles/global";
import Card from "../shared/card";

export default function WorkoutDetails({ route, navigation }) {
    const { title, exercises } = route.params;

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
        </View>
    )
}
