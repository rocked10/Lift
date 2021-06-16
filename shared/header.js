import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

export default function Header({ navigation, title }) {
    const openSettings = () => {
        navigation.navigate('Profile', {
            screen: 'Settings',
            initial: false,
        });
    }

    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{ title }</Text>
            <MaterialIcons name='settings' size={28} onPress={openSettings} style={styles.icon} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
    },

    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#383838',
    },

    icon: {
        position: 'absolute',
        right: 1,
        color: '#383838',
    }
})