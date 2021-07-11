import React from 'react';
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { globalStyles } from "../../styles/global";

export default function TableCell ({ value, onUpdate, editable=true, additionalStyles, keyboardType }) {
    return (
        // <View style={[styles.cell, { backgroundColor }]}>
        <TextInput
            style={{...styles.userInput, ...additionalStyles,}}
            editable={editable}
            value={value.toString()}
            placeholder={editable ? '0': '-'}
            onChangeText={onUpdate}
            keyboardType={keyboardType}
        />
        // </View>
    )
}

const styles = StyleSheet.create({
    userInput: {
        // color: '#000000',
        flex: 1,
        backgroundColor: '#ffffff',
        height: 48,
        textAlign: 'center',
        borderRadius: 0
    }
});