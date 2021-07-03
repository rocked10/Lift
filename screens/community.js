import React, { useEffect, useState } from 'react';
import { FlatList, View } from "react-native";
import { globalStyles } from "../styles/global";
import { Button, } from 'react-native-paper';
import { CommunityCard } from "../shared/communityCard";
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

    const handleLike = (id) => {
        DB.likePost(userId, id).then();
    }

    const handleComment = () => {

    }

    const CommunityPosts = ({ data }) => {
        return (
            <View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={({ item, index }) => {
                        return (
                            <CommunityCard
                                name={item.name}
                                role={item.role}
                                title={item.postTitle}
                                body={item.body}
                                workouts={item.workouts}
                                likes={item.likes}
                                comments={item.comments}
                                onPress={() => navigation.navigate('Community Post', {
                                    name: item.name,
                                    role: item.role,
                                    title: item.postTitle,
                                    body: item.body,
                                    workouts: item.workouts,
                                    likes: item.likes,
                                    comments: item.comments
                                })}
                                navigation={navigation}
                                handleLike={() => handleLike(item.postId)}
                                handleComment={() => handleComment()}
                            />
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
