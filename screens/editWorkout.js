import React, { useState, useEffect } from 'react';
import WorkoutForm from "./workoutForm";
import * as Auth from "../api/auth";
import * as DB from "../api/database";

export default function editWorkout({ route, navigation }) {
    const { title, exercises, id } = route.params;

    const handleEditWorkout = (workout) => {
        DB.editWorkout(Auth.getCurrentUserId(), id, workout).then();
        navigation.navigate('WorkoutDetails', {
            title: workout.title,
            exercises: workout.exercises,
        })
    }

    return (
        <WorkoutForm _workoutTitle={title} _exercises={exercises} addWorkout={handleEditWorkout} alreadyPreFilled={true}/>
    );
}