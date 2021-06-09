import React, { useState } from 'react';
import { TextInput, View, Button, FlatList, StatusBar, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import { globalStyles } from "../styles/global";
import { Table, TableCell } from './table'
import CustomButton from "../shared/customButton"
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Card from "../shared/card";

function ExerciseName({ value, onChangeText }) {
    return (
        <TextInput
            style={styles.exerciseName}
            onChangeText={onChangeText}
            placeholder='Enter exercise'
            defaultValue={value}
        />
    )
}

function HeaderCell({ title }) {
    return (
        <TableCell
            value={title}
            editable={false}
            additionalStyles={{ backgroundColor: '#ccc' }} />
    );
}

function TopRow() {
    return (
        <View style={styles.topRow}>
            <HeaderCell title='SET' />
            <HeaderCell title='WEIGHT' />
            <HeaderCell title='REPS' />
        </View>
    )
}

export default function ExerciseDetails({ exerciseName, tableData, onUpdate, deleteExercise, deleteSet, addSet, updateExerciseName }) {
    return (
        <Card>
            <View style={styles.cardHeader}>
                <ExerciseName value={exerciseName} onChangeText={(text) => updateExerciseName(text)} />
                <TouchableOpacity style={styles.deleteExercise} onPress={() => deleteExercise()}>
                    <MaterialIcons name="delete" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <Table
                headerComponent={TopRow}
                rows={tableData.length / 2}
                columns={2}
                data={tableData}
                onUpdate={onUpdate}
                deleteRow={deleteSet}
                keyboardType='phone-pad'
            />

            <CustomButton title='add set' onPress={() => addSet()} />
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginVertical: 20,
    },
    topRow: {
        flexDirection: 'row',
    },
    row: {
        flexDirection: 'row',
        textAlign: 'center',
    },
    exerciseName: {
        backgroundColor: '#d3d3d3',
        height: 40,
        width: '50%',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 14,
        alignSelf: 'flex-start',
        marginBottom: '3%'
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    deleteExercise: {
        alignSelf: 'flex-start'
    }

})