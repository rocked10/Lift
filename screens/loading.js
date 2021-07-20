import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

export default function Loading() {
    return (
        <View style={styles.screen}>
            <ActivityIndicator animating size="large" color="#0080ff" testID="Loading Indicator" />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: "center",
        flex: 1
    }
});