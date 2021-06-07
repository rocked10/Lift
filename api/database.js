import React from 'react';
import firebaseApp from "./firebase";
import firebase from 'firebase';

const db = firebase.database();

export const addWorkout = (userId, workout) => {
    db.ref(`workouts/${userId}`).push().set({
        exercises: workout.exercises,
        workoutTitle: workout.workoutTitle,
    }, (error) => {
        if (error) {
            console.log("Write failed");
        } else {
            console.log("Data saved");
        }
    })
}

export const subscribe = (userId, onValueChanged) => {
    const workouts = db.ref(`workouts/${userId}`);
    workouts.on("value", (snapshot) => {
        onValueChanged(snapshot.val())
        // console.log(snapshot.val());
    });
    return () => workouts.off("value");
}

export const addUserProfile = (userId, name, email, role) => {
    db.ref(`users/${role}`).push().set({
        userId: userId,
        name: name,
        email: email,
    }, (error) => {
        if (error) {
            console.log("User not saved");
        } else {
            console.log("User saved");
        }
    });
}

export const findUser = (email) => {
    const users = db.ref('users/coaches');
    let res = '';
    users.orderByChild('email').equalTo(email).on('value', (snapshot) => {
        console.log(snapshot.val());
        res = Object.values(snapshot.val())[0].userId;
    })
    return res;
}