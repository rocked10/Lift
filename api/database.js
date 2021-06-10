import React from 'react';
import firebaseApp from "./firebase";
import firebase from 'firebase';
import * as Auth from '../api/auth';

const db = firebase.database();

export const addWorkout = async (userId, workout) => {
    try {
        const ref = db.ref(`workouts/${userId}`).push();
        await ref.set({
            exercises: workout.exercises,
            workoutTitle: workout.workoutTitle,
            id: ref.key,
        });
        console.log("Data saved");
    } catch (error) {
        console.log("Write failed");
    }
}

export const editWorkout = async (userId, workoutId, workout) => {
    try {
        const ref = db.ref(`workouts/${userId}/${workoutId}`);
        await ref.update({
            exercises: workout.exercises,
            workoutTitle: workout.workoutTitle,
        });
        console.log("Data updated");
    } catch (error) {
        console.log("Update failed");
    }
}

export const deleteWorkout = async (userId, workoutId) => {
    try {
        const ref = db.ref(`workouts/${userId}/${workoutId}`);
        await ref.remove();
        console.log("Data removed");
    } catch (error) {
        console.log("Remove failed");
    }
}

export const subscribe = (userId, onValueChanged) => {
    const workouts = db.ref(`workouts/${userId}`);
    workouts.on("value", (snapshot) => {
        onValueChanged(snapshot.val())
    });
    return () => workouts.off("value");
}

export const addUserProfile = (userId, name, email, role) => {
    db.ref(`users/${userId}`).set({
        name: name,
        email: email,
        role: role,
    }, (error) => {
        if (error) {
            console.log("User not saved");
        } else {
            console.log("User saved");
        }
    });
}

export const findUserId = (email) => {
    const ref = db.ref('users');
    let uid = '';
    ref.orderByChild('email').equalTo(email)
        .on('value', (snapshot) => {
            if (snapshot.val()) {
                uid = Object.keys(snapshot.val())[0]
            } else {
                console.log('User not found');
            }
        })
    return uid;
}

export const getUserType = (onValueChanged) => {
    const ref = db.ref(`users/${Auth.getCurrentUserId()}`);
    ref.once('value', (snapshot) => {
        onValueChanged(snapshot.val().role);
    });
}

export const getUserName = (onValueChanged) => {
    const ref = db.ref(`users/${Auth.getCurrentUserId()}`);
    ref.once('value', (snapshot) => {
        onValueChanged(snapshot.val().name);
    });
}
