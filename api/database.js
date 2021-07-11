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
            sharedBy: ownUserId,
            id: workoutId,
            unseen: true,
        });
        console.log("Data saved");
    } catch (error) {
        console.log(error);
        console.log("Write failed");
    }
}

export const seenWorkout = async (userId, workoutId) => {
    try {
        const ref = db.ref(`workouts/${userId}/${workoutId}`);
        await ref.update({
            unseen: false,
        });
    } catch (error) {
        console.error(error);
        console.log('Error');
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
        console.error(error);
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


export const updateSetCompletionStatus = async (userId, workoutId, exerciseName, setNumber) => {
    try {
        const ref = db.ref(`workouts/${userId}/${workoutId}/exercises`).orderByChild('exerciseName')
            .equalTo(exerciseName);
        await ref.once('child_added', (snapshot) => {
            let data = snapshot.val().tableData
            data[setNumber - 1].completed = ! data[setNumber - 1].completed;
            snapshot.ref.update({
                tableData: data
            });
        });
        console.log("Set updated");
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

export const subscribeOnceAsync = async (userId) => {
    let ref = db.ref(`workouts/${userId}`);
    await ref.once('value', (snapshot) => {
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
        userId: userId,
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

export const getPR = async (userId, exerciseName, all=false) => {
    try {
        let ref = '';
        await db.ref(`users/${userId}/personalRecords`)
            .once('value', snapshot => {
                const obj = snapshot.val();
                if (obj) {
                    if (all) {
                        ref = obj;
                    } else {
                        ref = obj[exerciseName];
                    }
                }
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

export const deleteAthlete = async (userId, athleteId) => {
    try {
        const ref = db.ref(`users/${userId}/athletes/${athleteId}`);
        await ref.remove();
        console.log("Athlete removed");
    } catch (error) {
        console.log("Remove failed");
    }
}

export const findUserByEmail = async (email) => {
    try {
        let ref = '';
        await db.ref('users').orderByChild('email').equalTo(email)
            .once('value', snapshot => {
                ref = snapshot.val();
            });
        const uidObject = ref;
        if (ref) {
            return {id: Object.keys(uidObject)[0], name: Object.values(uidObject)[0].name};
        } else {
            return {id: '', name : ''};
        }
    } catch (error) {
        console.log(error);
    }
}

export const findUserByName = async (name, limit) => {
    try {
        let ref = '';
        await db.ref('users').orderByChild('name').startAt(name).endAt(name+"\uf8ff").limitToFirst(limit)
            .once('value', snapshot => {
                ref = snapshot.val();
            });
        if (ref) {
            return Object.values(ref);
        }
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

// export const getUserName = (userId, onValueChanged) => {
//     const ref = db.ref(`users/${userId}`);
//     ref.once('value', (snapshot) => {
//         onValueChanged(snapshot.val().name);
//     });
// }

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

export const addCustomExercise = async (exerciseCategory, exerciseName, videoId, userId) => {
    try {
        const ref = db.ref(`exercises/${exerciseName.toLowerCase()}`);
        await ref.set({
            category: exerciseCategory,
            exerciseName: exerciseName,
            videoId: videoId,
            userId: userId,
        });
        console.log("Custom Exercise added!")
    } catch (error) {
        console.log(error);
        console.log("Failed to add exercise");
    }
}

export const getExercisesByCategory = (category, onValueChanged) => {
    db.ref('exercises').orderByChild('category').equalTo(category)
        .once('value', snapshot => {
            // onValueChanged(Object.values(snapshot.val()));
            const exercises = Object.values(snapshot.val()).filter(ex => ! ex.userId || ex.userId === Auth.getCurrentUserId());
            onValueChanged(exercises);
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
            // postTitle: postTitle,
            body: body,
            date: date,
            workouts: workouts,
            userId: userId,
            postId: ref.key,
            name: name,
            role: role,
            likes: 0,
            comments: 0,
        });
        console.log('Post added');
    } catch (error) {
        console.log(error);
    }
}

export const likePost = async (userId, postId) => {
    try {
        const ref = db.ref(`community/${postId}/likes/${userId}`);
        await ref.set({
            id: userId,
        });
        console.log("Liked Post");
    } catch (error) {
        console.log("Failed to like post");
        console.log(error);
    }
}

export const addComment = async (userId, postId, username, comment) => {
    try {
        const ref = db.ref(`community/${postId}/comments`).push();
        await ref.set({
            id: userId,
            name: username,
            comment: comment,
        });
        console.log("Commented");
    } catch (error) {
        console.log("Failed to comment");
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

export const getPostComments = (postId, onValueChanged) => {
    const comments = db.ref(`community/${postId}/comments`);
    comments.on("value", (snapshot) => {
        onValueChanged(snapshot.val());
    });
    return () => comments.off("value");
}
