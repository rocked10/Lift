import React from 'react';
import { TextInput, View, StyleSheet } from "react-native";

// using value as prop in TextInput led to text flickering issue. changing to defaultValue fixed it.

export default function TableCell ({ value, onUpdate, editable=true, additionalStyles, keyboardType }) {
    return (
        // <View style={[styles.cell, { backgroundColor }]}>
        <TextInput
            style={{...styles.userInput, ...additionalStyles}}
            editable={editable}
            defaultValue={value.toString()}
            onChangeText={onUpdate}
            keyboardType={keyboardType}
        />
        // </View>
    )
}

const styles = StyleSheet.create({
    userInput: {
        color: '#000000',
        flex: 1,
        backgroundColor: '#ffffff',
        height: 51,
        textAlign: 'center',
    }
});