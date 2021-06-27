import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Table, TableCell } from './table'
import { MaterialIcons } from '@expo/vector-icons';
import { Button, } from "react-native-paper"
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { Octicons } from '@expo/vector-icons';

function ExerciseName({ value, onChangeText }) {
    return (
        <Text style={styles.exerciseName}>{value}</Text>
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

// need to fix the regex....

const handleSelectVariation = (variation, updateExerciseName, exerciseName) => {
    if (variation === 'barbell') {
        updateExerciseName(/\([a-zA-Z]+\)/.test(exerciseName) ? exerciseName.replace(/\[(.+?)\]/g, "(Barbell)") : exerciseName + " (Barbell) ")
    } else if (variation === 'dumbbell') {
        updateExerciseName(/\([a-zA-Z]+\)/.test(exerciseName) ? exerciseName.replace(/\[(.+?)\]/g, "(Dumbbell)") : exerciseName + " (Dumbbell) ")
    } else if (variation === 'bodyweight') {
        updateExerciseName(/\([a-zA-Z]+\)/.test(exerciseName) ? exerciseName.replace(/\[(.+?)\]/g, "(Bodyweight)") : exerciseName + " (Bodyweight) ")
    }
}

const selectVariation = (updateExerciseName, exerciseName) => {
    Alert.alert(
        'Choose a variation',
        '',
        [{text: "Barbell", onPress:() => handleSelectVariation('barbell', updateExerciseName, exerciseName)}, 
        {text: 'Dumbbell', onPress:() => handleSelectVariation('dumbbell', updateExerciseName, exerciseName)}, 
        {text: 'Bodyweight', onPress:() => handleSelectVariation('bodyweight', updateExerciseName, exerciseName)}]
    )
}

const ExerciseVariationOption = ({exerciseCategory, updateExerciseName, exerciseName}) => {
    if (exerciseCategory === 'Olympic' || exerciseCategory === 'Cardio') {
        return null;
    } else { 
        return (
            <MenuOption
                customStyles={optionStyles}
                onSelect={() => selectVariation(updateExerciseName, exerciseName)}
                text='Select Variation'
            />
        )
    }
}

function DropDownSelection({ deleteExercise, exerciseCategory, updateExerciseName, exerciseName }) {
    return (
        <Menu>
            <MenuTrigger hitSlop={{ top: 20, bottom: 50, left: 60, right: 50 }} >
                <Octicons name="kebab-horizontal" size={26} color="black" />
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
                <ExerciseVariationOption exerciseCategory={exerciseCategory} updateExerciseName={updateExerciseName} exerciseName={exerciseName} />
                <MenuOption
                    customStyles={optionStyles}
                    onSelect={deleteExercise}
                >
                    <Text style={{ color: 'red' }}>Delete</Text>
                </MenuOption>
            </MenuOptions>
        </Menu>
    )
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
                    <DropDownSelection deleteExercise={deleteExercise} exerciseCategory={exerciseCategory} updateExerciseName={updateExerciseName} exerciseName={exerciseName} />
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

                <Button onPress={() => addSet()} style={{ marginTop: 3 }}>
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

const optionsStyles = {
    optionsContainer: {
        backgroundColor: '#f5f5f5',
        width: 160,
        borderRadius: 4,
        padding: 4,
    },
};

const optionStyles = {
    optionText: {
        color: 'black',
        fontWeight: 'bold'
    },
};