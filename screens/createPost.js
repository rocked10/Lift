import React, { useState } from 'react';
import {View, StyleSheet, TextInput } from 'react-native';
import { Avatar, Card, Button, Chip } from 'react-native-paper';
import { globalStyles } from "../styles/global";
import { MaterialIcons } from "@expo/vector-icons";
import ProfileCard from "../shared/profileCard";
import * as DB from '../api/database';


export default function CreatePost({ navigation, route }) {
    const { name, role, userId } = route.params;
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [attachedWorkouts, setAttachedWorkouts] = useState([]);

    const date = new Date();

    const RightContent = props =>
        <Button
            mode="contained"
            style={{marginRight: 14}}
            onPress={() => {
                console.log('POST')
                DB.addCommunityPost(userId, name, role, postTitle.trim(),
                    postBody.trim(), date.getDate(), attachedWorkouts).then();
                navigation.goBack();
            }}
        >
            Post
        </Button>

    const onSelect = (params) => {
        let newArray = [...attachedWorkouts, params];
        setAttachedWorkouts(newArray);
    }

    const WorkoutChips = ({ data }) => {
        if (data) {
            const items = data.map((item, index) => (
                <Chip
                    key={Math.random()}
                    style={{margin: 4}}
                    onClose={() => {
                        let newArray = [...attachedWorkouts];
                        newArray.splice(index, 1);
                        setAttachedWorkouts(newArray);
                    }}
                >
                    {item.workout.workoutTitle}
                </Chip>
            ));
            return items;
        } else {
            return null;
        }
    }

    return (
        <View style={globalStyles.container}>
            <ProfileCard title={name} subtitle={role} right={RightContent} />

            <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginVertical: 8}}>
                {/*<TextInput*/}
                {/*    placeholder='Add Title...'*/}
                {/*    style={styles.input}*/}
                {/*    defaultValue={postTitle}*/}
                {/*    onChangeText={input => setPostTitle(input)}*/}
                {/*/>*/}

                <TextInput
                    placeholder="What's your workout of the day?"
                    multiline={true}
                    style={styles.input}
                    textAlignVertical='top'
                    defaultValue={postBody}
                    onChangeText={input => setPostBody(input)}
                />

                <MaterialIcons
                    name='attach-file'
                    size={28}
                    onPress={() => {
                        navigation.navigate('Attach Workout', { onSelect: onSelect })
                    }}
                />
            </View>

            <View
                style={styles.chipContainer}
            >
                <WorkoutChips data={attachedWorkouts} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        padding: 12,
        fontSize: 18,
        fontFamily: 'lato-regular',
        flex: 1
    },

    chipContainer: {
        flexDirection: 'row',
        position: 'absolute',
        margin: 12,
        bottom: 0,
    }
});
