import React, {useState} from 'react';
import { View, Text, StyleSheet, Alert } from "react-native";
import { Table, TableCell } from './table'
import { Button, } from "react-native-paper"
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { Octicons } from '@expo/vector-icons';

function ExerciseName({ value, }) {
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

const generateExerciseNameWithVariation = (variation, exerciseName) => {
    for (let i = 0; i < exerciseName.length; i++) {
        if (exerciseName.charAt(i) === '(') {
            return exerciseName.substring(0, i - 1) + ' (' + variation + ')';
        }
    }
    return exerciseName + ' (' + variation + ')'; 
}

const handleSelectVariation = (variation, updateExerciseName, exerciseName, updateVariation, setVariation) => {
    if (variation === 'Barbell') {
        updateVariation('Barbell')
        setVariation('Barbell')
    } else if (variation === 'Dumbbell') {
        updateVariation('Dumbbell')
        setVariation('Dumbbell')
    } else if (variation === 'Bodyweight') {
        updateVariation('Bodyweight')
        setVariation('Bodyweight')
    }
    const newName = generateExerciseNameWithVariation(variation, exerciseName)
    console.log(newName)
    updateExerciseName(newName)
}

const selectVariation = (updateExerciseName, exerciseName, updateVariation, setVariation) => {
    Alert.alert(
        'Choose a variation',
        '',
        [{text: "Barbell", onPress:() => handleSelectVariation('Barbell', updateExerciseName, exerciseName, updateVariation, setVariation)}, 
        {text: 'Dumbbell', onPress:() => handleSelectVariation('Dumbbell', updateExerciseName, exerciseName, updateVariation, setVariation)}, 
        {text: 'Bodyweight', onPress:() => handleSelectVariation('Bodyweight', updateExerciseName, exerciseName, updateVariation, setVariation)}]
    )
}

const ExerciseVariationOption = ({exerciseCategory, updateExerciseName, exerciseName, updateVariation, setVariation}) => {
    if (exerciseCategory === 'Olympic' || exerciseCategory === 'Cardio') {
        return null;
    } else { 
        return (
            <MenuOption
                customStyles={optionStyles}
                onSelect={() => selectVariation(updateExerciseName, exerciseName, updateVariation, setVariation)}
                text='Select Variation'
            />
        )
    }
}

function DropDownSelection({ deleteExercise, exerciseCategory, updateExerciseName, exerciseName, updateVariation, setVariation }) {
    return (
        <Menu>
            <MenuTrigger hitSlop={{ top: 20, bottom: 50, left: 60, right: 50 }} >
                <Octicons name="kebab-horizontal" size={26} color="black" />
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
                <ExerciseVariationOption exerciseCategory={exerciseCategory} updateExerciseName={updateExerciseName} exerciseName={exerciseName} updateVariation={updateVariation} setVariation={setVariation} />
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

export default function ExerciseDetails({ exerciseName, exerciseCategory, tableData, onUpdate, deleteExercise, deleteSet, addSet, updateExerciseName, updateExerciseVariation, visible }) {
    const isCardio = exerciseCategory === 'Cardio'
    const [variation, setVariation] = useState('');

    if (visible) {
        return (
            // <Card>
            <View style={{ padding: 6 }}>
                <View style={styles.cardHeader}>
                    <ExerciseName value={exerciseName} />
                    <DropDownSelection deleteExercise={deleteExercise} exerciseCategory={exerciseCategory} updateExerciseName={updateExerciseName} exerciseName={exerciseName} updateVariation={updateExerciseVariation} setVariation={setVariation} />
                </View>
                <Table
                    headerComponent={<TopRow isCardio={isCardio} />}
                    data={tableData}
                    onUpdate={onUpdate}
                    deleteRow={deleteSet}
                    variation={variation}
                    keyboardType='phone-pad'
                />

                <Button onPress={addSet} style={{ marginTop: 3 }}>
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