import React, { useState } from 'react';
import {View, Text, SectionList, TouchableOpacity} from "react-native";
import { List } from 'react-native-paper';
import { globalStyles } from "../styles/global";
import { Searchbar } from 'react-native-paper';

export default function Exercises() {
    const barbell = ["Back Squat", "Front Squat", "Bench Press"]
    const olympic = ["Snatch", "Clean and Jerk",]

    const handlePress = () => {
        console.log("hi");
    }

    const Render = ({ data }) => {
        const listItems = data.map((item) =>
            <TouchableOpacity onPress={handlePress}>
                <List.Item title={item}/>
            </TouchableOpacity>
            )
        return (
            <View>
                { listItems }
            </View>
        );
    }

    return (
        <View style={globalStyles.container}>
            <Searchbar
                placeholder="Search for an exercise..."
            />

            <List.Section title="Exercises">
                <List.Accordion
                    title="Barbell"
                    left={props => <List.Icon {...props} icon="equal" />}
                >
                    <Render data={barbell}/>
                </List.Accordion>

                <List.Accordion
                    title="Olympic"
                    left={props => <List.Icon {...props} icon="equal" />}
                >
                    <Render data={olympic} />
                </List.Accordion>
            </List.Section>

        </View>
    );
}