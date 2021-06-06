import React, { useState } from 'react';
import { TextInput, View, Button, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function customButton({ onPress, title }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.ButtonContainer} >
            <Text style={styles.ButtonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    ButtonContainer: {
    //   elevation: 8,
      backgroundColor: "#fff",
    //   borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12
    },
    ButtonText: {
      fontSize: 16,
      color: "#6495ed",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }
});