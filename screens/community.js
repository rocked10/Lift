import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../styles/global";
import { Avatar, Button, Card, FAB, Title, Paragraph } from 'react-native-paper';
import MyCard from '../shared/card';
import * as DB from '../api/database';
import * as Auth from '../api/auth';


export default function Community({ navigation, route }) {
    const [posts, setPosts] = useState({});
    const [userProfile, setUserProfile] = useState({});
    const [userId, setUserId] = useState(Auth.getCurrentUserId());

    useEffect(() => {
        return DB.getUserProfile(userId, setUserProfile);
    }, []);

    useEffect(() => {
        return DB.getCommunityPosts(setPosts);
    }, []);

    const LeftContent = props => <Avatar.Icon {...props} icon="account" />

    const CommunityCard = ({ name, role, title, body, workouts }) => {

        return (
            <Card style={{ backgroundColor: '#F5F5F5', margin: 10 }} onPress={() => { }}>
                <Card.Title titleStyle={{ fontFamily: 'lato-bold' }} title={name} subtitle={role} left={LeftContent} />
                <Card.Content>
                    <Title style={{ fontFamily: 'lato-bold' }} >{title}</Title>

                    {workouts &&
                        workouts.map((item) => (
                            <TouchableOpacity
                                key={Math.random()}
                                onPress={() => {
                                    navigation.navigate('Workout Details', {
                                        workoutTitle: item.workout.workoutTitle,
                                        exercises: item.workout.exercises,
                                        _completionStatus: item.workout.exercises.map(exercise => {
                                            let arr = [];
                                            for (let i = 0; i < exercise.tableData.length; i++) {
                                                arr.push(exercise.tableData[i].completed);
                                            }
                                            return arr;
                                        }),
                                        id: item.id,
                                        forViewingOnly: true,
                                        forDownload: true,
                                    });
                                }}
                            >
                                <MyCard>
                                    <View style={styles.cardHeader}>
                                        <Title style={{ fontFamily: 'lato-bold' }} >{item.workout.workoutTitle}</Title>
                                    </View>
                                </MyCard>
                            </TouchableOpacity>
                        ))
                    }

                    <Paragraph style={{ fontFamily: 'lato-regular' }} >{body}</Paragraph>
                </Card.Content>

                <Card.Actions>
                    <Button onPress={() => { }}>Like</Button>
                    <Button onPress={() => { }}>Comment</Button>
                </Card.Actions>
            </Card>
        );
    };

    const CommunityPosts = ({ data }) => {
        return (
            <View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={({ item, index }) => {
                        return (
                            <CommunityCard name={item.name} role={item.role} title={item.postTitle} body={item.body} workouts={item.workouts} />
                        );
                    }}
                    keyExtractor={(item, index) => item + index}
                />
            </View>
        );
    }

    return (
        <View style={globalStyles.container}>
            <Button style={{ marginBottom: 20 }} mode='contained' compact={true}
                onPress={() => {
                    navigation.navigate('Create Post', {
                        name: userProfile.name,
                        role: userProfile.role,
                        userId: userId,
                    });
                }}
            >
                Add Post
            </Button>

            <CommunityPosts data={posts ? Object.values(posts).reverse() : []} />

        </View>
    );
}

const styles = StyleSheet.create({
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});