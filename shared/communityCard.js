import { Avatar, Button, Card, Paragraph, Title, Divider } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import MyCard from "./card";
import React from "react";

export const CommunityCard = ({ name, role, body, limitBody=false, workouts, likes, comments, onPress, handleLike, handleComment, navigation }) => {
    const LeftContent = props => <Avatar.Icon {...props} icon="account" />

    const ConditionalParagraph = ({ text }) => {
        if (limitBody) {
            return (
                <Paragraph
                    style={{ fontFamily: 'lato-regular', fontSize: 16, marginBottom: 12 }}
                    numberOfLines={4}
                >
                    {text}
                </Paragraph>
            );
        } else {
            return (
                <Paragraph
                    style={{ fontFamily: 'lato-regular', fontSize: 16, marginBottom: 12 }}
                >
                    {text}
                </Paragraph>
            );
        }
    }

    return (
        <Card style={{ backgroundColor: '#F5F5F5', margin: 4, marginBottom: 8 }} onPress={onPress} >
            <Card.Title titleStyle={{ fontFamily: 'lato-bold' }} title={name} subtitle={role} left={LeftContent} />
            <Card.Content style={{marginTop: 6,}}>

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

                <ConditionalParagraph text={body} />

                <View
                    style={[styles.cardHeader, {marginVertical: 12 }]}
                >
                    <Text style={styles.captionText}>{`${likes !== 0 ? Object.keys(likes).length : 0} likes`}</Text>
                    <Text style={styles.captionText}>{`${comments !== 0 ? Object.keys(comments).length : 0} comments`}</Text>
                </View>
            </Card.Content>

            <Divider />

            <Card.Actions style={{marginVertical: -4}}>
                <Button onPress={handleLike}>Like</Button>
                <Button onPress={handleComment ? handleComment : onPress}>Comment</Button>
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