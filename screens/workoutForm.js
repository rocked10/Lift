import React from 'react';
import {TextInput, View, Button, StatusBar } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Formik, FieldArray, Form } from 'formik';
import { ListItem } from "react-native-elements";
import { globalStyles } from "../styles/global";

export default function WorkoutForm({ addWorkout }) {

    return (
        <View style={globalStyles.container}>
            <Formik
                initialValues = {{title: '', exercises: ['']}}
                onSubmit={(values, actions) => {
                    addWorkout(values);
                    actions.resetForm();
                }}
            >
                {(props) => (
                    <View>
                        <View style={globalStyles.inputView}>
                            <TextInput
                                style={globalStyles.input}
                                placeholder='Workout Title...'
                                onChangeText={props.handleChange('title')}
                                value={props.values.title}
                            />
                        </View>

                        <FieldArray
                            name='exercises'
                        >

                        {(arrayHelpers) => (
                            <View style={globalStyles.inputView}>
                                {props.values.exercises.map((exercise, index) => (
                                <ListItem key={index} containerStyle={globalStyles.input}>
                                    <TextInput
                                        style={{fontSize: 17}}
                                        placeholder='Enter exercise'
                                        onChangeText={text => arrayHelpers.replace(index, {exercise: text, key: Math.random()})}
                                    />
                                </ListItem>
                                ))}
                                <MaterialIcons
                                    name='add'
                                    size={26}
                                    onPress={() => arrayHelpers.push('')}
                                />
                            </View>
                        )}
                        </FieldArray>

                        <Button title='Add Workout' onPress={props.handleSubmit} />
                    </View>
                )}

            </Formik>

            <StatusBar></StatusBar>
        </View>
    );
}