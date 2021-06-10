import React from 'react';
import {View, Text, SectionList } from "react-native";
import { globalStyles } from "../styles/global";
import { Searchbar } from 'react-native-paper';

export default function Exercises() {
    const DATA = [
        {
            title: "Olympic Lifts",
            data: ["Clean and Jerk", "Snatch", "Power Snatch"]
        },
        {
            title: "Barbell",
            data: ["Back Squat", "Front Squat", "Bench Press"]
        }
    ];

    return (
        <View style={globalStyles.container}>
            <Searchbar
                placeholder="Type Here..."
            />

            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Text>{item}</Text>}
                renderSectionHeader={({ section: { title } }) => (
                    <Text>{title}</Text>
                )}
            />
        </View>
    );
}