import React from 'react';
import {
    View, StyleSheet, Text, TouchableOpacity, 
} from "react-native";
import TableCell from "./TableCell";
import { SwipeListView } from 'react-native-swipe-list-view';

export default function Table({ headerComponent, data, onUpdate, deleteRow, variation, keyboardType }) {
    // const cells = new Array(rows * columns);
    // for (let { set, weight, reps } of data) {
    //     cells[row * columns + column] = value;
    // }

    // const listData = chunkArray(cells, columns)
    //     .map((value, index) => ({ vals: value, key: `${index}` }));

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const _deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        deleteRow(parseInt(rowKey));
    };

    const renderItem = (data, rowMap) => {
        return (
            <TableRow
                data={data.item}
                onColumnUpdate={onUpdate(parseInt(data.item.set))}
                variation={variation}
                keyboardType={keyboardType}
            />
        )
    }

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => _deleteRow(rowMap, data.item.set)}
            >
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SwipeListView
            data={data}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            ListHeaderComponent={headerComponent}
            rightOpenValue={-75}
            disableRightSwipe={true}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            // maxToRenderPerBatch={5}
            removeClippedSubviews={false}
        />
    )

    // return (
    //     <FlatList
    //         data={chunkArray(cells, columns)}
    //         ListHeaderComponent={headerComponent}
    //         keyExtractor={(item, index) => index}
    //         removeClippedSubviews={false}
    //         renderItem={({ item, index }) =>
    //             <TableRow
    //                 rowNumber={index}
    //                 rowValues={item}
    //                 onColumnUpdate={onUpdate(index)}
    //                 deleteRow={deleteRow}
    //                 keyboardType={keyboardType}
    //             />
    //         }
    //         stickyHeaderIndices={[0]}
    //     />
    // );
}

function TableRow({ data, onColumnUpdate, variation, keyboardType }) {
    return (
        <View style={styles.row}>
            <TableCell value={data.set} editable={false} />
            
            <TableCell
                value={data.weight}
                onUpdate={onColumnUpdate(0)}
                editable={variation !== 'Bodyweight'}
                keyboardType={keyboardType}
            />
            <TableCell
                value={data.reps}
                onUpdate={onColumnUpdate(1)}
                keyboardType={keyboardType}
            />
            

            {/* <TouchableOpacity style={styles.delete} onPress={() => deleteRow(rowNumber)}>
                    <MaterialIcons name="delete" size={24} color="black" />
            </TouchableOpacity> */}
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
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});

// function chunkArray(arr, n) {
//     return arr.reduce((acc, item, index) => {
//         const remainder = index % n;
//         if (remainder === 0) return [...acc, [item]];
//         const updatedArr = [...acc];
//         const subArrIndexToUpdate = (index - remainder) / n;
//         updatedArr[subArrIndexToUpdate] = [
//             ...updatedArr[subArrIndexToUpdate],
//             item,
//         ];
//         return updatedArr;
//     }, []);
// }