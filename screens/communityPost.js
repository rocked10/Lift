import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Keyboard, ScrollView } from 'react-native';
import { Avatar, Card, Paragraph, TextInput } from 'react-native-paper';

import { CommunityCard } from "../shared/communityCard";
import { globalStyles } from "../styles/global";
import * as DB from "../api/database";

export default function CommunityPost({ navigation, route }) {
    const postDetails = route.params;

    const textInputRef = useRef();
    const [comment, setComment] = useState('');
    const [postComments, setPostComments] = useState({});

    useEffect(() => {
        return DB.getPostComments(postDetails.postId, setPostComments);
    }, []);

    const LeftContent = props => <Avatar.Icon {...props} color='white' icon="account" />

    const CommentCard = ({ title, comment }) => {
        return (
            <Card style={{ backgroundColor: '#F5F5F5', margin: 4, marginBottom: 8 }}>
                <Card.Title
                    titleStyle={{fontFamily: 'lato-bold'}}
                    title={title}
                    left={LeftContent}
                />

                <Card.Content>
                    <Paragraph style={{ fontSize: 16 }}>{comment}</Paragraph>
                </Card.Content>
            </Card>
        );
    }

    const handleLike = (id) => {
        DB.likePost(postDetails.userId, id).then();
    }

    const handleComment = () => {
        Keyboard.dismiss();
        textInputRef.current.clear();
        DB.addComment(postDetails.userId, postDetails.postId, postDetails.username, comment.trim()).then();
    }

    return (
        <View style={globalStyles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
                data={postComments ? Object.values(postComments) : []}
                ListHeaderComponent={(
                    <CommunityCard
                        name={postDetails.name}
                        role={postDetails.role}
                        title={postDetails.title}
                        body={postDetails.body}
                        workouts={postDetails.workouts}
                        likes={postDetails.likes}
                        comments={postComments}
                        navigation={navigation}
                        handleLike={() => handleLike(postDetails.postId)}
                        handleComment={Keyboard.dismiss}
                    />
                )}
                renderItem={({ item }) => {
                    return (
                        <CommentCard title={item.name} comment={item.comment} />
                    );
                }}
                keyExtractor={(item, index) => item + index}
            />


            <TextInput
                style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
                placeholder="Write a comment..."
                value={comment}
                onChangeText={comment => setComment(comment)}
                right={<TextInput.Icon name="send" onPress={handleComment} />}
                ref={textInputRef}
            />
        </View>
    );
}