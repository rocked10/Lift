import React, { useState } from "react";
import { View, Text } from 'react-native';
import { globalStyles } from '../styles/global';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function ExerciseDescription({ navigation, route}) {
    const { exercise } = route.params;
    // Exercise video links will be placed in database
    const [exerciseVideos, setExerciseVideos] = useState({'Back Squat': 'dW5-C1fsMjk', 'Front Squat': 'vUN0YUfnTcE', 'Bench Press': 'rT7DgCr-3pg',
        'Snatch': 'BqWYvGDIRwE', 'Clean and Jerk': 'q9HbsciMSJU'});

    const YouTubePlayer = ({ videoId }) => {
        return (
            <YoutubePlayer
                videoId={videoId}
                height={250}
                play={true}
            />
        );
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.titleText}>{ exercise }</Text>
            <YouTubePlayer videoId={exerciseVideos[exercise]} />
        </View>
    );
}