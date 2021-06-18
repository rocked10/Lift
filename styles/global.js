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
        padding: 10,
        fontSize: 17,
        borderRadius: 6,
    },

    modalContent: {
        flex: 1,
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
    },

    inputView: {
        backgroundColor: "#D3D3D3",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        padding: 20,
    },

    inputText: {
        height: 50,
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
})

export const navigationStyles = {
    headerStyle: {
        backgroundColor: '#0080ff',
        height: 60,
    },
    headerTintColor: '#444',
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
}