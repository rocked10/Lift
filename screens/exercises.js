import React, { useState } from 'react';
import { View, TouchableOpacity } from "react-native";
import { List } from 'react-native-paper';
import { globalStyles } from "../styles/global";
import { Searchbar } from 'react-native-paper';


export default function Exercises({ navigation, route }) {
    const barbell = ["Back Squat", "Front Squat", "Bench Press"]
    const olympic = ["Snatch", "Clean and Jerk",]

    const exercises = [{title: 'Barbell', data: barbell}, {title: 'Olympic', data: olympic}]

    const Render = ({ data }) => {
        const listItems = data.map((item, index) =>
            <TouchableOpacity
                key={`${item}-${index}`}
                onPress={() => {
                    navigation.navigate('ExerciseDescription', {
                        exercise: item,
                    })
                }}
            >
                <List.Item
                    titleStyle={{fontFamily: 'lato-regular'}}
                    title={item}
                />
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

            <List.Section title="Exercises" titleStyle={{fontFamily: 'lato-bold'}}>
                {
                    exercises.map((exercise, index) => (
                        <List.Accordion
                            key={`${exercise.title}-${index}`}
                            title={exercise.title}
                            left={props => <List.Icon {...props} icon="equal" />}
                            titleStyle={{fontFamily: 'lato-bold'}}
                        >
                            <Render data={exercise.data}/>
                        </List.Accordion>
                    ))
                }
            </List.Section>

        </View>
    );
}