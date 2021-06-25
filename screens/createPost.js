import React, { useState } from 'react';
import {View, StyleSheet, TextInput } from 'react-native';
import { Avatar, Card, Button, Chip } from 'react-native-paper';
import { globalStyles } from "../styles/global";
import { MaterialIcons } from "@expo/vector-icons";
import * as DB from '../api/database';


export default function CreatePost({ navigation, route }) {
    const { name, role, userId } = route.params;
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [attachedWorkouts, setAttachedWorkouts] = useState([]);

    const date = new Date();

    const LeftContent = props => <Avatar.Icon {...props} color='white' icon="account" />

    const RightContent = props =>
        <Button
            mode="contained"
            style={{marginRight: 14}}
            onPress={() => {
                console.log('POST')
                DB.addCommunityPost(userId, name, role, postTitle, postBody, date.getDate(), attachedWorkouts);
                navigation.goBack();
            }}
        >
            Post
        </Button>

    const PostCard = () => (
        <Card style={{backgroundColor: '#F5F5F5'}}>
            <Card.Title
                titleStyle={{fontFamily: 'lato-bold'}}
                title={name}
                subtitle={role}
                left={LeftContent}
                right={RightContent}
            />
        </Card>
    );

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
            <PostCard />

            <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                <TextInput
                    placeholder='Add Title...'
                    style={styles.input}
                    defaultValue={postTitle}
                    onChangeText={input => setPostTitle(input)}
                />

                <MaterialIcons
                    name='attach-file'
                    size={28}
                    onPress={() => {
                        navigation.navigate('Attach Workout', { onSelect: onSelect })
                    }}
                />
            </View>

            <TextInput
                placeholder="What's on your mind?"
                multiline={true}
                style={styles.input}
                defaultValue={postBody}
                onChangeText={input => setPostBody(input)}
            />

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
    },

    chipContainer: {
        flexDirection: 'row',
        position: 'absolute',
        margin: 12,
        bottom: 0,
    }
});
