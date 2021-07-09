import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from "react-native";

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
      backgroundColor: "#6200ee",
    //   borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12
    },
    ButtonText: {
      fontSize: 16,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }
});