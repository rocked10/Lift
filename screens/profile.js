import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Button } from "react-native";
import { globalStyles } from "../styles/global";
import firebase from 'firebase';
import * as Auth from '../api/auth';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import CustomButton from '../shared/customButton'
import * as DB from '../api/database'


export default function Profile({ navigation }) {
    const [role, setRole] = useState('');

    useEffect(() => {
        DB.getUserType(setRole);
    }, [role]);

    const signOut = () => {
        firebase.auth().signOut()
            .then(() => {
                console.log("Successfully signed out");
            }).catch((error) => {
                console.log(error);
            });
    }
    
    return (
        <View style={globalStyles.container}>
            {/* <Text>Profile</Text>
            <Text>{ userEmail }</Text> */}
            {/* <Text>{ username }</Text> */}
            <ScrollView showsVerticalScrollIndicator={true}>
                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image
                            style={styles.image}
                            source={{ uri: 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg' }}
                        />
                    </View>
                    <Text style={styles.username}>{ Auth.getCurrentUserEmail() }</Text>
                    <Text style={styles.role}>{ role }</Text>
                    <View style={styles.editProfile}>
                        <Button title='edit profile' onPress={() => navigation.navigate('Settings')} />
                    </View>
                    
                </View>

                <View style={styles.statsBar}>
                    <View style={styles.statsBarItem}>
                        <Text style={{ alignSelf: 'center' }}>30000</Text>
                        <Text>Followers</Text>
                    </View>
                    <View style={styles.statsBarItem}>
                        <Text style={{ alignSelf: 'center' }}>60000</Text>
                        <Text>Following</Text>
                    </View>
                    <View>
                        <Text style={{ alignSelf: 'center' }}>90000</Text>
                        <Text>Workouts</Text>
                    </View>
                </View>
                <View style={styles.personalRecordsTitle}>
                    <FontAwesome name="trophy" size={24} color="gold" />
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginHorizontal: 12 }}>Personal Records</Text>
                    <FontAwesome name="trophy" size={24} color="gold" />
                </View>
            </ScrollView>

            

            {/* <TouchableOpacity
                onPress={signOut}
            >
                <Text>Sign out</Text>
            </TouchableOpacity> */}
        </View>
    );
}

const styles = StyleSheet.create({
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: "hidden"
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    username: {
        alignSelf: 'center',
        marginTop: 8,
        fontWeight: 'bold',
        fontSize: 24
        // fontFamily: 'RobotoSlab-Black'
    },
    role: {
        alignSelf: 'center',
        marginBottom: 16,
        fontWeight: "600"
    },
    statsBar: {
        flexDirection: 'row',
        // flex: 1, 
        justifyContent: 'space-between',
        // alignItems: 'center'
    },
    statsBarItem: {
        // think of a better way to centralise the bars 
        paddingRight: 29,
        borderRightWidth: 1,
        borderRightColor: "#b0e0e6"
    },
    personalRecordsTitle: {
        justifyContent: 'center',
        padding: 18,
        flexDirection: 'row'
    }, 
    editProfile: {
        paddingBottom: 16
    }

})