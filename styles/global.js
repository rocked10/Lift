import React from 'react';
import { StyleSheet } from 'react-native';
import { CardStyleInterpolators } from "@react-navigation/stack";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },

    titleText: {
        fontFamily: 'lato-bold',
        fontSize: 22,
        marginBottom: 16
    },

    text: {
        fontFamily: 'lato-regular',
        fontSize: 18,
        marginBottom: 16
    },

    cardText: {
        fontFamily: 'lato-regular',
        fontSize: 14,
    },

    inputView: {
        marginVertical: 10
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        fontFamily: 'lato-regular',
        padding: 10,
        fontSize: 17,
        borderRadius: 6,
    },

    modalContent: {
        flex: 1,
        marginVertical: 2,
        padding: 8
    },

    modalClose: {
        marginTop: 20,
        marginBottom: 0,
    },

    modalToggle: {
        alignSelf: 'center',
    },
});

export const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputView: {
        flexDirection: 'row',
        backgroundColor: "#D3D3D3",
        borderRadius: 25,
        height: 50,
        width: '90%',
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    inputText: {
        flex: 1,
        height: 50,
        marginLeft: 10
    },

    loginText: {
        fontSize: 13,
        padding: 10,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },

    appTitle: {
        fontFamily: 'karla-bold',
        fontSize: 28,
        marginVertical: 16
    }
});

export const settingStyles = StyleSheet.create({
    container: {
        flex: 1,
    },

    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 20,
        fontFamily: 'lato-bold',
        color: "#fff",
        backgroundColor: '#6200ee',
    },

    itemLabel: {
        padding: 10,
        fontSize: 14,
    },

    item: {
        padding: 10,
        fontSize: 16,
        height: 40,
    },

    listItemSeparatorStyle: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#C8C8C8',
    },
});

export const navigationStyles = {
    headerStyle: {
        backgroundColor: '#0080ff',
        height: 60,
    },
    headerTintColor: '#444',
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
}

export const pictures = {
    'logo': require('../assets/LiftLogo-trimmy-trimmy.png'),
}

