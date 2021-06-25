import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Table, TableCell } from './table'
import { MaterialIcons } from '@expo/vector-icons';
import { Button, } from "react-native-paper"

function ExerciseName({ value, onChangeText }) {
    return (
        // <TextInput
        //     mode='outlined'
        //     style={{backgroundColor: 'white'}}
        //     theme={{ colors: { text: '#483d8b' } }}
        //     onChangeText={onChangeText}
        //     placeholder='Enter exercise'
        //     defaultValue={value}
        //     selectionColor='blue'

        // />
        <Text style={styles.exerciseName}>{value}</Text>
        // <TouchableOpacity onPress={onChangeText}>
        //     <MaterialIcons name="delete" size={24} color="black" />
        // </TouchableOpacity>
    )
}

function HeaderCell({ title }) {
    return (
        <TableCell
            value={title}
            editable={false}
            additionalStyles={{ color: 'blue' }}
        />
    );
}

function TopRow({ isCardio }) {
    if (isCardio) {
        return (
            <View style={styles.row}>
                <HeaderCell title='SET' />
                <HeaderCell title='DISTANCE' />
                <HeaderCell title='TIME' />
            </View>
        )
    } else {
        return (
            <View style={styles.row}>
                <HeaderCell title='SET' />
                <HeaderCell title='WEIGHT' />
                <HeaderCell title='REPS' />
            </View>
        )
    }
}

export default function ExerciseDetails({ exerciseName, exerciseCategory, tableData, onUpdate, deleteExercise, deleteSet, addSet, updateExerciseName, visible }) {
    // console.log(exerciseCategory)
    const isCardio = exerciseCategory === 'Cardio'
    // console.log(isCardio)
    console.log(exerciseName)

    if (visible) {
        return (
            // <Card>
            <View style={{ padding: 6 }}>
                <View style={styles.cardHeader}>
                    <ExerciseName value={exerciseName} />
                    <TouchableOpacity style={styles.deleteExercise} onPress={() => deleteExercise()}>
                        <MaterialIcons name="delete" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Table
                    headerComponent={<TopRow isCardio={isCardio} />}
                    rows={tableData.length / 2}
                    columns={2}
                    data={tableData}
                    onUpdate={onUpdate}
                    deleteRow={deleteSet}
                    keyboardType='phone-pad'
                />

                <Button onPress={() => addSet()} style={{marginTop: 3}}>
                    <Text style={{ fontFamily: 'karla-bold' }}>ADD SET</Text>
                </Button>
            </View>

            // </Card>
        )
    } else {
        return null;
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginVertical: 20,
    },
    row: {
        flexDirection: 'row',
        textAlign: 'center',
    },
    // exerciseName: {
    //     backgroundColor: '#d3d3d3',
    //     height: 40,
    //     width: '50%',
    //     flexDirection: 'row',
    //     padding: 10,
    //     borderRadius: 14,
    //     alignSelf: 'flex-start',
    //     marginBottom: '3%'
    // },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    deleteExercise: {
        alignSelf: 'flex-start'
    },
    exerciseName: {
        fontFamily: 'lato-bold',
        fontSize: 18,
        marginBottom: 8
    },

})