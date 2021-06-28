import React from 'react';
import firebaseApp from "./firebase";
import firebase from 'firebase';
import * as Auth from '../api/auth';


const db = firebase.database();

// Generic
export const deleteUser = async (userId) => {
    await Auth.signOut();

    const ref = db.ref(`users/${userId}`);
    ref.remove().then(() => {
        console.log("Profile Removed")
    }).catch((error) => {
        console.log("Error removing profile: " + error.message);
    });

    const workoutRef = db.ref(`workouts/${userId}`);
    workoutRef.remove().then(() => {
        console.log("User Workouts Removed")
    }).catch((error) => {
        console.log("Error removing workouts: " + error.message);
    });
}

// Workout
export const addWorkout = async (userId, workout) => {
    try {
        const ref = db.ref(`workouts/${userId}`).push();
        await ref.set({
            exercises: workout.exercises,
            workoutTitle: workout.workoutTitle,
            completed: workout.completed,
            id: ref.key,
        });
        console.log("Data saved");
    } catch (error) {
        console.log(error);
        console.log("Write failed");
    }
}

export const addSharedWorkout = async (ownUserId, sharedUserId, workoutId, workout) => {
    try {
        const ref = db.ref(`workouts/${sharedUserId}/${workoutId}`);
        await ref.set({
            exercises: workout.exercises,
            workoutTitle: workout.workoutTitle,
            completed: workout.completed,
            sharedBy: ownUserId,
            id: workoutId,
        });
        console.log("Data saved");
    } catch (error) {
        console.log(error);
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
        console.error(error)
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

export const updateSetCompletionStatus = async (userId, workoutId, completed) => {
    try {
        const ref = db.ref(`workouts/${userId}/${workoutId}`);
        await ref.update({
            completed: completed
        });
        console.log("Set completed");
    } catch (error) {
        console.log("Error updating set");
    }
}

export const subscribe = (userId, onValueChanged) => {
    const workouts = db.ref(`workouts/${userId}`);
    workouts.on("value", (snapshot) => {
        onValueChanged(snapshot.val())
    });
    return () => workouts.off("value");
}

export const subscribeOnce = (userId) => {
    let ref = db.ref(`workouts/${userId}`);
    ref.once('value', (snapshot) => {
        ref = snapshot.val();
    });
    return ref;
}

// Profile
export const addUserProfile = (userId, name, email, role) => {
    db.ref(`users/${userId}`).set({
        name: name,
        email: email,
        role: role,
        bio: '',
    }, (error) => {
        if (error) {
            console.log("User not saved");
        } else {
            console.log("User saved");
        }
    });

    db.ref(`users/${userId}/fitnessInfo`).set({
        gender: '',
        height: '',
        weight: '',
    });
}

export const addPR = (userId, exerciseName, pr, displayOnProfile) => {
    db.ref(`users/${userId}/personalRecords/${exerciseName}`).set({
        exerciseName: exerciseName,
        weight: pr[0],
        reps: pr[1],
        displayOnProfile: displayOnProfile,
    }, (error) => {
        if (error) {
            console.log("Personal record not added");
        } else {
            console.log("Personal record added");
        }
    });
}

export const getPR = async (userId, exerciseName) => {
    try {
        let ref = '';
        await db.ref(`users/${userId}/personalRecords`)
            .once('value', snapshot => {
                const obj = snapshot.val();
                ref = obj[exerciseName];
            });
        return ref;
    } catch (error) {
        console.error(error)
        console.log("Error finding PR");
    }
}

export const addAthlete = async (userId, athleteId) => {
    try {
        let name = '';
        // Add Athlete's name
        const info = db.ref(`users/${athleteId}`);
        await info.once('value', snapshot => {
            name = snapshot.val().name;
        });

        const ref = db.ref(`users/${userId}/athletes/${athleteId}`)
        await ref.set({
            id: athleteId,
            name: name,
        });
        console.log("Athlete added");
    } catch (error) {
        console.log("Error adding athlete");
    }
}

export const findUserId = async (email) => {
    try {
        let ref = '';
        await db.ref('users').orderByChild('email').equalTo(email)
            .once('value', snapshot => {
                ref = snapshot.val();
            });
        const uidObject = ref;
        return { id: Object.keys(uidObject)[0], name: Object.values(uidObject)[0].name };
    } catch (error) {
        console.log(error);
    }
}

export const getUserProfile = (userId, onValueChanged) => {
    let ref = db.ref(`users/${userId}`);
    ref.on('value', snapshot => {
        onValueChanged(snapshot.val());
    });
    return () => ref.off("value");
}

export const updateFitnessInfo = async (userId, detail, value) => {
    try {
        const ref = db.ref(`users/${userId}/fitnessInfo`);
        await ref.update({
            [detail]: value,
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateInfo = async (userId, reference, key, value) => {
    let ref = '';
    if (reference === 'userInfo') {
        ref = db.ref(`users/${userId}`);
    } else {
        ref = db.ref(`users/${userId}/${reference}`);
    }
    try {
        await ref.update({
            [key]: value,
        });
    } catch (error) {
        console.log(error);
    }
}

export const getUserType = (onValueChanged) => {
    const ref = db.ref(`users/${Auth.getCurrentUserId()}`);
    ref.once('value', (snapshot) => {
        onValueChanged(snapshot.val().role);
    });
}

export const getUserName = (userId, onValueChanged) => {
    const ref = db.ref(`users/${userId}`);
    ref.once('value', (snapshot) => {
        onValueChanged(snapshot.val().name);
    });
}

// Exercises
export const addExercise = async (exerciseCategory, exerciseName, videoId) => {
    try {
        const ref = db.ref(`exercises/${exerciseName.toLowerCase()}`);
        await ref.set({
            category: exerciseCategory,
            exerciseName: exerciseName,
            videoId: videoId,
        });
        console.log("Exercise added!")
    } catch (error) {
        console.log(error);
        console.log("Failed to add exercise");
    }
}

export const getExercisesByCategory = (category, onValueChanged) => {
    db.ref(`exercises`).orderByChild('category').equalTo(category)
        .once('value', snapshot => {
            onValueChanged(Object.values(snapshot.val()));
        });
}

export const getExerciseByName = async (name) => {
    try {
        let ref = '';
        await db.ref(`exercises`).orderByKey().equalTo(name.toLowerCase())
            .once('value', snapshot => {
                ref = snapshot.val();
            })
        return ref[name.toLowerCase()];
    } catch (error) {
        console.log(error);
    }
}

// Community
export const addCommunityPost = async (userId, name, role, postTitle, body, date, workouts) => {
    try {
        const ref = db.ref(`community`).push();
        await ref.set({
            postTitle: postTitle,
            body: body,
            date: date,
            workouts: workouts,
            userId: userId,
            name: name,
            role: role,
        });
        console.log('Post added');
    } catch (error) {
        console.log(error);
    }
}

export const getCommunityPosts = (onValueChanged) => {
    const posts = db.ref(`community`);
    posts.on("value", (snapshot) => {
        onValueChanged(snapshot.val())
    });
    return () => posts.off("value");
}
