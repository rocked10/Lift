import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Button } from "react-native";
import { List } from 'react-native-paper';
import { globalStyles } from "../styles/global";
import { Searchbar } from 'react-native-paper';
import * as DB from '../api/database';


export default function Exercises({ navigation, route, cameFromWorkoutForm, onSelectExercise, setModalOpen, setFormVisible }) {
    const [searchQuery, setSearchQuery] = useState('');

    const [olympic, setOlympic] = useState([]);
    const [legs, setLegs] = useState([]);
    const [chest, setChest] = useState([]);
    const [back, setBack] = useState([]);

    const [expanded, setExpanded] = useState({
        Olympic: false,
        Legs: false,
        Chest: false,
        Back: false
    });

    useEffect(() => {
        DB.getExercisesByCategory("Olympic", setOlympic);
        DB.getExercisesByCategory("Legs", setLegs);
        DB.getExercisesByCategory("Chest", setChest);
        DB.getExercisesByCategory("Back", setBack);
    }, []);

    const exercises = [{ title: 'Olympic', data: olympic }, { title: 'Legs', data: legs },
    { title: 'Chest', data: chest }, { title: 'Back', data: back }];

    const Render = ({ data }) => {
        let highlight = '';
        const listItems = data.map((item, index) => {
            if (item.exerciseName.toLowerCase() === searchQuery.toLowerCase().trim()) {
                highlight = '#6200ee';

            } else {
                highlight = 'black';
            }

            return (
                <TouchableOpacity
                    key={`${item.exerciseName}-${index}`}
                    onPress={() => {
                        if (! cameFromWorkoutForm) {
                            navigation.navigate('ExerciseDescription', {
                                exercise: item,
                            })
                        } else { 
                            onSelectExercise(item.exerciseName)
                            setModalOpen(false)
                            setFormVisible(true)
                        }
                    }}
                >
                    <List.Item
                        titleStyle={{ fontFamily: 'lato-regular', color: highlight }}
                        title={item.exerciseName}
                    />
                </TouchableOpacity>
            );

        });

        return (
            <View>
                {listItems}
            </View>
        );
    }

    const onChangeSearch = (query) => {
        setSearchQuery(query);
    }

    const handleSearch = async () => {
        const exercise = await DB.getExerciseByName(searchQuery.trim());
        if (exercise) {
            setExpanded({ ...expanded, [exercise.category]: true });
        }
    }

    const handleExpansion = (title) => {
        const initialState = expanded[title]
        setExpanded({ ...expanded, [title]: !initialState });
    }

    // Exercise adder
    // const handlePress = async () => {
    //     DB.addExercise('Back', 'Barbell Row','9efgcAjQe7E').then();
    //     DB.getExerciseByName('Clean and Jerk').then();
    // }

    return (
        <View style={globalStyles.container}>
            <Searchbar
                placeholder="Search for an exercise..."
                onChangeText={onChangeSearch}
                value={searchQuery}
                onIconPress={handleSearch}
                onSubmitEditing={handleSearch}
            />

            <List.Section title="Exercises" titleStyle={{ fontFamily: 'lato-bold' }}>
                {
                    exercises.map((exercise, index) => (
                        <List.Accordion
                            key={`${exercise.title}-${index}`}
                            title={exercise.title}
                            expanded={expanded[exercise.title]}
                            onPress={() => handleExpansion(exercise.title)}
                            left={props => <List.Icon {...props} icon="equal" />}
                            titleStyle={{ fontFamily: 'lato-bold' }}
                        >
                            <Render data={exercise.data} />
                        </List.Accordion>
                    ))
                }
            </List.Section>

            {/*<Button onPress={handlePress} title="Add" />*/}

        </View>
    );
}