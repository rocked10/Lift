import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

const Card = (props) => {
    return (
        <View style={styles.card}>
            {/* <TouchableOpacity>
                <MaterialIcons
                    style={styles.cardIcon}
                    name='edit'
                    size={26}
                />
            </TouchableOpacity> */}
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    );
}

export default Card;

const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#eee',
        shadowOffset: { width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2 ,
        marginHorizontal: 2,
        marginVertical: 9,
    },

    cardContent: {
        marginHorizontal: 18,
        marginVertical: 10,
    },

    cardIcon: {
        marginLeft: 'auto',
        marginRight: 5,
    }
});