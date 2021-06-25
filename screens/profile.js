import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, FlatList } from "react-native";
import { globalStyles } from "../styles/global";
import firebase from 'firebase';
import * as Auth from '../api/auth';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Card from '../shared/card'
import CustomButton from '../shared/customButton'
import * as DB from '../api/database'
import { Button } from 'react-native-paper'
import { Entypo } from '@expo/vector-icons';


export default function Profile({ navigation, route }) {
    const [userProfile, setUserProfile] = useState({});
    const [userId, setUserId] = useState(Auth.getCurrentUserId());
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        DB.getUserProfile(userId, setUserProfile);
        DB.subscribe(userId, setWorkouts);
    }, []);

    const signOut = () => {
        firebase.auth().signOut()
            .then(() => {
                console.log("Successfully signed out");
            }).catch((error) => {
                console.log(error);
            });
    }

    const AthleteList = ({ role }) => {
        if (role === 'Coach') {
            return (
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('Athlete List')}
                    style={{ borderRadius: 10, marginHorizontal: 12 }}
                >
                    <Text style={{ fontFamily: 'karla-bold' }}>ATHLETES</Text>
                </Button>

            )
        } else {
            return null;
        }
    }

    const PersonalRecords = () => {
        if (userProfile.personalRecords) {
            const entries = Object.entries(userProfile.personalRecords).map(item => {
                const [name, pr] = item
                const label = name + ": " + pr[0] + "kg" + " x " + pr[1]
                return (
                    <Text style={globalStyles.text}>{label}</Text>
                )
            })

            return (
                <View style={styles.container}>
                    {entries}
                </View>
            )
        } else {
            return null;
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={signOut}
                        style={{ alignSelf: 'flex-end' }}
                    >
                        <Entypo name="log-out" size={28} color="black"  />
                    </TouchableOpacity>

                    <View style={styles.profileImage}>
                        <Image
                            style={styles.image}
                            source={{ uri: 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg' }}
                        />
                    </View>

                    <Text style={styles.email}>{Auth.getCurrentUserEmail()}</Text>
                    <Text style={styles.role}>{userProfile.role}</Text>
                    <Text style={styles.bio}>{userProfile.bio}</Text>
                    <View style={styles.personalRecordsTitle}>
                        <Button
                            mode="contained"
                            onPress={() => navigation.navigate('Edit Profile', {
                                userProfile: userProfile
                            })}
                            style={{ borderRadius: 10, marginHorizontal: 12 }}
                        >
                            <Text style={{ fontFamily: 'karla-bold' }}>EDIT PROFILE</Text>
                        </Button>
                        <AthleteList role={userProfile.role} />
                    </View>

                </View>


                {/* <View style={styles.statsBar}>
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
                </View> */}
                <Card>
                    <View style={styles.personalRecordsTitle}>
                        <FontAwesome name="trophy" size={24} color="gold" />
                        <Text style={{ ...globalStyles.titleText, marginHorizontal: 6 }}>Personal Records</Text>
                        <FontAwesome name="trophy" size={24} color="gold" />
                    </View>

                    <PersonalRecords />
                </Card>

            </ScrollView>




        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: "hidden",
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    // statsBar: {
    //     flexDirection: 'row',
    //     // flex: 1, 
    //     justifyContent: 'space-between',
    //     // alignItems: 'center'
    // },
    // statsBarItem: {
    //     // think of a better way to centralise the bars 
    //     paddingRight: 29,
    //     borderRightWidth: 1,
    //     borderRightColor: "#b0e0e6"
    // },
    personalRecordsTitle: {
        justifyContent: 'space-between',
        padding: 14,
        flexDirection: 'row',
    },
    email: {
        fontFamily: 'lato-bold',
        fontSize: 22,
        marginTop: 5,
    },
    role: {
        fontFamily: 'lato-regular',
        fontSize: 14,
        marginTop: 5
    },
    bio: {
        fontFamily: 'lato-regular',
        fontSize: 16,
        marginTop: 8
    }
})