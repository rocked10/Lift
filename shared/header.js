import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

export default function Header({ navigation, title, displaySettings }) {
    const openSettings = () => {
        navigation.navigate('Profile', {
            screen: 'Settings',
            initial: false,
        });
    }

    const SettingsIcon = () => {
        if (displaySettings) {
            return (
                <MaterialIcons name='settings' size={28} onPress={openSettings} style={styles.icon}/>
            );
        } else {
            return null;
        }
    }

    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{ title }</Text>
            <SettingsIcon />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
    },

    headerText: {
        fontSize: 26,
        fontFamily: 'lato-bold',
        // color: '#383838',
        color: 'white',
    },

    icon: {
        position: 'absolute',
        right: 1,
        color: 'white',
    }
})