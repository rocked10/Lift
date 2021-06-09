import React from 'react';
import { View, FlatList, StyleSheet, Button, KeyboardAvoidingView, Text, TouchableOpacity } from "react-native";
import TableCell from "./TableCell";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function Table({ headerComponent, rows, columns, data, onUpdate, deleteRow, keyboardType }) {
    const cells = new Array(rows * columns);
    for (let { row, column, value } of data) {
        cells[row * columns + column] = value;
    }

    return (
        <FlatList
            data={chunkArray(cells, columns)}
            ListHeaderComponent={headerComponent}
            keyExtractor={(item, index) => index}
            removeClippedSubviews={false}
            renderItem={({ item, index }) =>
                <TableRow
                    rowNumber={index}
                    rowValues={item}
                    onColumnUpdate={onUpdate(index)}
                    deleteRow={deleteRow}
                    keyboardType={keyboardType}
                />
            }
            stickyHeaderIndices={[0]}
        />
    );
}

function TableRow({ rowNumber, rowValues, onColumnUpdate, deleteRow, keyboardType }) {
    return (
        <View style={styles.row}>
            <TableCell value={rowNumber + 1} editable={false} />
            {rowValues.map((value, index) =>
                <TableCell
                    key={index.toString() + onColumnUpdate}
                    value={value}
                    onUpdate={onColumnUpdate(index)}
                    keyboardType={keyboardType}
                />)
            }

            <TouchableOpacity style={styles.delete} onPress={() => deleteRow(rowNumber)}>
                    <MaterialIcons name="delete" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    topRow: {
        height: '15%',
        flexDirection: 'row'
    },
    delete: {
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
});

function chunkArray(arr, n) {
    return arr.reduce((acc, item, index) => {
        const remainder = index % n;
        if (remainder === 0) return [...acc, [item]];
        const updatedArr = [...acc];
        const subArrIndexToUpdate = (index - remainder) / n;
        updatedArr[subArrIndexToUpdate] = [
            ...updatedArr[subArrIndexToUpdate],
            item,
        ];
        return updatedArr;
    }, []);
}