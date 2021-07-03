import { Avatar, Button, Card, Paragraph, Title } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import MyCard from "./card";
import React from "react";

export const CommunityCard = ({ name, role, title, body, workouts, likes, comments, onPress, handleLike, handleComment, navigation }) => {
    const LeftContent = props => <Avatar.Icon {...props} icon="account" />

    return (
        <Card style={{ backgroundColor: '#F5F5F5', margin: 10 }} onPress={onPress} >
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

                <Paragraph style={{ fontFamily: 'lato-regular', fontSize: 16, marginBottom: 12 }} >{body}</Paragraph>

                <View
                    style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: -8}}
                >
                    <Text style={styles.captionText}>{`${likes !== 0 ? Object.keys(likes).length : 0} likes`}</Text>
                    <Text style={styles.captionText}>{`${comments !== 0 ? Object.keys(comments).length : 0} comments`}</Text>
                </View>
            </Card.Content>

            <Card.Actions>
                <Button onPress={handleLike}>Like</Button>
                <Button onPress={handleComment}>Comment</Button>
            </Card.Actions>
        </Card>
    );
};

const styles = StyleSheet.create({
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    captionText: {
        fontFamily: 'lato-regular',
        fontSize: 14
    }

});