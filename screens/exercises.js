import React, {useEffect, useState} from 'react';
import { Alert, Keyboard, ScrollView, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../styles/global";
import * as DB from '../api/database';
import { List, Searchbar } from "react-native-paper"
import { MaterialIcons } from "@expo/vector-icons";


export default function Exercises({ navigation, route, cameFromWorkoutForm, currentExercisesInForm, onSelectExercise, setModalOpen, setFormVisible }) {
    const [searchQuery, setSearchQuery] = useState('');

    // For merging data in handleExercises
    const [temp, setTemp] = useState([]);
    const [temp2, setTemp2] = useState([]);

    const [olympic, setOlympic] = useState([]);
    const [legs, setLegs] = useState([]);
    const [chest, setChest] = useState([]);
    const [back, setBack] = useState([]);
    const [arms, setArms] = useState([]);
    const [cardio, setCardio] = useState([]);

    const [expanded, setExpanded] = useState({});

    const exercises = [{ title: 'Olympic', data: olympic }, { title: 'Legs', data: legs },
    { title: 'Chest', data: chest }, { title: 'Back', data: back }, { title: 'Arms', data: arms },
    { title: 'Cardio', data: cardio }];

    useEffect(() => {
        DB.getExercisesByCategory("Olympic", setOlympic);
        DB.getExercisesByCategory("Legs", setLegs);
        DB.getExercisesByCategory("Chest", setChest);
        DB.getExercisesByCategory("Back", setBack);
        DB.getExercisesByCategory("Arms", setArms);
        DB.getExercisesByCategory("Cardio", setCardio);
    }, []);

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
                        if (!cameFromWorkoutForm) {
                            console.log(item)
                            navigation.navigate('ExerciseDescription', {
                                exercise: item,
                            });
                        } else {
                            if (currentExercisesInForm.map(exercise => exercise.exerciseName).includes(item.exerciseName)) {
                                Alert.alert(
                                    "Exercise already added!",
                                    "Please choose another exercise",
                                    [{ text: "Ok", }]
                                );
                            } else {
                                onSelectExercise(item);
                                setModalOpen(false);
                                setFormVisible(true);
                            }
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

    const AddCustomExerciseButton = ({ visible }) => {
        if (visible) {
            return (
                <TouchableOpacity
                    style={{ alignSelf: 'flex-end', marginTop: 12 }}
                    onPress={() => {
                        navigation.navigate('Custom Exercise', {
                            categoryExercisesSetters: [setOlympic, setLegs, setChest, setBack, setArms, setCardio],
                        })
                    }}
                    testID="Add Custom Exercise"
                >
                    <MaterialIcons name='add' size={28} />
                </TouchableOpacity>
            );
        } else {
            return null;
        }
    }

    const onChangeSearch = (query) => {
        setSearchQuery(query);
    }

    const handleSearch = async () => {
        Keyboard.dismiss();
        const exercise = await DB.getExerciseByName(searchQuery.trim());
        if (exercise) {
            for (let i in expanded) {
                expanded[i] = false;
            }
            setExpanded({ ...expanded, [exercise.category]: true });
        } else {
            if (cameFromWorkoutForm) {
                let customExerciseObject = {
                    category: "userDefined",
                    exerciseName: searchQuery,
                };

                if (currentExercisesInForm.map(exercise => exercise.exerciseName).includes(searchQuery)) {
                    Alert.alert(
                        "You have already added this exercise to your workout form",
                        "Please choose another exercise",
                        [{ text: "Ok", }]
                    )
                } else {
                    Alert.alert(
                        "Hmm, we don't know what that exercise is",
                        "Add it anyway?",
                        [{ text: "Yes", onPress: () => { setModalOpen(false); setFormVisible(true); onSelectExercise(customExerciseObject); } },
                        { text: "No", }
                        ]
                    )
                }
            }
        }
    }

    const handleExpansion = (title) => {
        const initialState = expanded[title];
        setExpanded({ ...expanded, [title]: !initialState });
    }

    return (
        <View style={globalStyles.container}>
            <Searchbar
                placeholder="Search for an exercise..."
                onChangeText={onChangeSearch}
                value={searchQuery}
                onIconPress={handleSearch}
                onSubmitEditing={handleSearch}
                inputStyle={{ fontFamily: 'lato-regular' }}
                testID='Search Exercise'
            />

            <AddCustomExerciseButton visible={! cameFromWorkoutForm} />

            <ScrollView showsVerticalScrollIndicator={false} testID={'Exercises'}>
                <List.Section title="Exercises" titleStyle={{ fontFamily: 'lato-bold', marginTop: -6 }}>
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
            </ScrollView>
        </View>
    );
}
