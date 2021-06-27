import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SectionList, Alert } from "react-native";
import * as Auth from "../api/auth";


export default function Settings({ navigation }) {

    const FlatListItemSeparator = () => {
        return (
          //Item Separator
          <View style={styles.listItemSeparatorStyle} />
        );
    };

    const handleAccount = (item) => {
        if (item === 'Change password') {
            // Auth.changePassword();
        } else if (item === 'Change email') {
            // Auth.changeEmail();
        } else if (item === 'Delete account') {
            Alert.alert(
                "",
                "Are you sure you want to delete your account? This action cannot be undone.",
                [{ text: "Cancel", onPress: () => console.log("Cancel Pressed") },
                    { text: "OK", onPress: () => { Auth.deleteUser(); } }
                ]
            );
        } else if (item === 'Personal Records') {
            Alert.alert(
                "",
                "Do some shit here",
                [
                    { text: "OK", onPress: () => { Auth.deleteUser(); } }
                ]
            );
        }
    }

    return (
        <View style={styles.container}>
            <SectionList
                ItemSeparatorComponent={FlatListItemSeparator}
                sections={[
                    { title: 'Account', data: ['Change email', 'Change password', 'Enable workout notifications', 'Delete account'] },
                    { title: 'General', data: ['Personal Records'] }
                ]}

                renderItem = {({item, index, section}) => {
                    return (
                        <TouchableOpacity onPress={() => handleAccount(item)}>
                            <Text style={styles.item}>{item}</Text>
                        </TouchableOpacity>
                    );
                }}

                renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
            />
        </View>
    );
}

const styles = StyleSheet.create({ 
    container: {  
        flex: 1,   
    },

    sectionHeader: {  
        paddingTop: 6,
        paddingLeft: 10,  
        paddingRight: 10,  
        paddingBottom: 6,
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
        fontFamily: 'lato-regular',
        height: 40,  
    },

    listItemSeparatorStyle: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#C8C8C8',
    },  
})  