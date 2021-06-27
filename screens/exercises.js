import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, Keyboard } from "react-native";
import { globalStyles } from "../styles/global";
import * as DB from '../api/database';
import { Searchbar, Dialog, Button, Paragraph, List } from "react-native-paper"


export default function Exercises({ navigation, route, cameFromWorkoutForm, onSelectExercise, setModalOpen, setFormVisible }) {
    const [searchQuery, setSearchQuery] = useState('');

    const [olympic, setOlympic] = useState([]);
    const [legs, setLegs] = useState([]);
    const [chest, setChest] = useState([]);
    const [back, setBack] = useState([]);
    const [arms, setArms] = useState([]);
    const [cardio, setCardio] = useState([]);

    const [alertVisible, setAlertVisible] = useState(false);
    const showAlert = () => setAlertVisible(true);
    const hideAlert = () => setAlertVisible(false);

    const [expanded, setExpanded] = useState({});

    const exercises = [{ title: 'Olympic', data: olympic }, { title: 'Legs', data: legs },
    { title: 'Chest', data: chest }, { title: 'Back', data: back }, { title: 'Arms', data: arms},
        { title: 'Cardio', data: cardio }];

    useEffect(() => {
        DB.getExercisesByCategory("Olympic", setOlympic);
        DB.getExercisesByCategory("Legs", setLegs);
        DB.getExercisesByCategory("Chest", setChest);
        DB.getExercisesByCategory("Back", setBack);
        DB.getExercisesByCategory("Arms", setArms);
        DB.getExercisesByCategory("Cardio", setCardio);
    }, []);


    // const f = () => {
    //     let initialSelectedState = {}
    //     exercises.map((category) => {
    //         const temp = new Array(category.data.length).fill(false);
    //         initialSelectedState[category.title] = temp;
    //     });
    //     return initialSelectedState
    // }

    // const [selected, setSelected] = useState(f());

    // console.log(selected)

    // const getExerciseBgColor = (item, index) => {
    //     selected[item.category][index] ? 'blue' : 'white'
    // }



    // can be abstracted. will be abstracted. 

    const AlertMessage = () => {
        let customExerciseObject = {
            category: "userDefined",
            exerciseName: searchQuery,
        };

        return (
            <Dialog visible={alertVisible} dismissable={false}>
                <Dialog.Title>Hmm... we don't know what that exercise is</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Add it anyway?</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => { hideAlert(); setModalOpen(false); setFormVisible(true); onSelectExercise(customExerciseObject) }}>Yes</Button>
                    <Button onPress={hideAlert}>No</Button>
                </Dialog.Actions>
            </Dialog>
        );
    }

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
                            })
                        } else {
                            // setSelected(prev => {
                            //     console.log("****8")
                            //     console.log(prev)
                            //     const newSelected = { ...prev }
                            //     // console.log(item.category)
                            //     newSelected[item.category][index] = true
                            //     return newSelected
                            // })
                            onSelectExercise(item)
                            setModalOpen(false)
                            setFormVisible(true)
                        }
                    }}
                >
                    <List.Item
                        titleStyle={{ fontFamily: 'lato-regular', color: highlight }}
                        title={item.exerciseName}
                        // style={{ backgroundColor: getExerciseBgColor(item, index) }}
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
        Keyboard.dismiss();
        const exercise = await DB.getExerciseByName(searchQuery.trim());
        console.log(exercise);
        if (exercise) {
            for (let i in expanded) {
                expanded[i] = false;
            }
            setExpanded({ ...expanded, [exercise.category]: true });
        } else {
            if (cameFromWorkoutForm) {
                showAlert();
            }
        }
    }

    const handleExpansion = (title) => {
        const initialState = expanded[title];
        setExpanded({ ...expanded, [title]: !initialState });
    }

    // Exercise adder
    const handlePress = async () => {
        DB.addExercise('Arms', 'Bicep Curl','sAq_ocpRh_I').then();
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
            />

            <ScrollView showsVerticalScrollIndicator={false} >
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
            </ScrollView>

            <AlertMessage />

            {/*<Button onPress={handlePress}>Add</Button>*/}

        </View>
    );

}