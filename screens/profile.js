import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, FlatList } from "react-native";
import { globalStyles } from "../styles/global";
import * as Auth from '../api/auth';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import Card from '../shared/card'
import * as DB from '../api/database'
import { Button } from 'react-native-paper'


export default function Profile({ navigation, route }) {
    const [userProfile, setUserProfile] = useState({});
    const [userId, setUserId] = useState(Auth.getCurrentUserId());
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        DB.getUserProfile(userId, setUserProfile);
        DB.subscribe(userId, setWorkouts);
    }, []);

    const AthleteListButton = ({ role }) => {
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

    const PersonalRecordsCard = () => {
        if (userProfile.personalRecords) {
            let count = 0; 
            const entries = Object.values(userProfile.personalRecords).map(item => {
                const label = item.exerciseName + ": " + item.weight + "kg" + " x " + item.reps;
                if (item.displayOnProfile) {
                    count++;
                    return (
                        <Text key={Math.random()} style={globalStyles.text}>{label}</Text>
                    );
                }
            });

            if (count === 0) {
                return (
                    <Text style={globalStyles.text}>We see that you've been putting in the work. How about showing those PRs off!</Text>
                )
            } else {
                return (
                    <View style={styles.container}>
                        {entries}
                    </View>
                );
            }
        } else {
            return (
                <Text style={globalStyles.text}>You don't have any yet! Time to get to work...</Text>
            )
        }
    }
    
    // to put the log out icon at the top right corner 
    const [position, setPosition] = useState("absolute");

    return (
        <View style={{padding: 18,}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Entypo
                        name="log-out"
                        size={28}
                        color="black"
                        onPress={Auth.signOut}
                        style={{ position: 'absolute', top: 0, right: 0 }}
                    />

                    <View style={styles.profileImage}>
                        <Image
                            style={styles.image}
                            source={{ uri: 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg' }}
                        />
                    </View>

                    <Text style={styles.email}>{userProfile.name}</Text>
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
                        <AthleteListButton role={userProfile.role} />
                    </View>
                </View>



                <Card>
                    <View style={styles.personalRecordsTitle}>
                        <FontAwesome name="trophy" size={24} color="gold" />
                        <Text style={{ ...globalStyles.titleText, marginHorizontal: 6 }}>Personal Records</Text>
                        <FontAwesome name="trophy" size={24} color="gold" />
                    </View>

                    <PersonalRecordsCard />
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
        height: undefined,
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