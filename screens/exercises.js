import React, { useState } from 'react';
import { View, Text, SectionList } from "react-native";
import { List } from 'react-native-paper';
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
                placeholder="Search for an exercise..."
            />

            <List.Section title="Exercises">
                <List.Accordion
                    title="Olympic Lifts"
                    left={props => <List.Icon {...props} icon="folder" />}
                >
                    <List.Item title="First item" />
                    <List.Item title="Second item" />
                </List.Accordion>
            </List.Section>

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