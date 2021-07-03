import React from 'react';
import { View } from 'react-native';

import { CommunityCard } from "../shared/communityCard";

export default function CommunityPost({ navigation, route }) {
    const postDetails = route.params;

    return (
        <View>
            <CommunityCard
                name={postDetails.name}
                role={postDetails.role}
                title={postDetails.title}
                body={postDetails.body}
                workouts={postDetails.workouts}
                likes={postDetails.likes}
                comments={postDetails.comments}
                navigation={navigation}
            />
        </View>
    );
}