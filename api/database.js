import React from 'react';
import firebaseApp from "./firebase";
import firebase from 'firebase';
import * as Auth from '../api/auth';

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

export const getUserType = () => {
    const ref = db.ref(`users/${Auth.getCurrentUserId()}`);
    let role = '';
    ref.once('value', (snapshot) => {
       role = snapshot.val().role;
    });
    return role;
}

export const getUserName = () => {
    const ref = db.ref(`users/${Auth.getCurrentUserId()}`);
    let name = '';
    ref.once('value', (snapshot) => {
        name = snapshot.val().name;
    });
    return name;
}