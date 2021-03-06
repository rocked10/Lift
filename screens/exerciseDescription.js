import React from "react";
import { View, Text } from 'react-native';
import { globalStyles } from '../styles/global';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function ExerciseDescription({ navigation, route}) {
    const { exercise } = route.params;
   
    const YouTubePlayer = ({ videoId }) => {
        if (videoId) {
            return (
                <YoutubePlayer
                    videoId={videoId}
                    height={250}
                    play={true}
                />
            );
        } else {
            return null;
        }
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.titleText}>{ exercise.exerciseName }</Text>
            <YouTubePlayer videoId={exercise.videoId} />
        </View>
    );
}