import React from 'react';
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
    },

    titleText: {
        fontFamily: 'sans-serif-medium',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16
    },

    text: {
        fontFamily: 'sans-serif-medium',
        fontSize: 18,
        marginBottom: 16
    },

    cardText: {
        fontFamily: 'sans-serif-medium',
        fontSize: 15,
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