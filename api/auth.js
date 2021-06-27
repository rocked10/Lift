import firebase from 'firebase';
import { Alert } from "react-native";


const auth = firebase.auth();

export const signIn = async({ email, password }, onSuccess, onError) => {
    try {
        const { user } = await auth.signInWithEmailAndPassword(email, password);
        console.log(email);
        console.log(password);
        return onSuccess(user);
    } catch (error) {
        return onError(error);
    }
}

export const signUp = async(username, email, password, role, onSuccess, onError) => {
    try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        if (user) {
            return onSuccess(user);
        }
    } catch (error) {
        console.log(error.message);
        Alert.alert(
            "Error",
            error.message,
            [
                { text: "OK",
                    onPress: () => console.log("OK Pressed") }
            ]
        );
        return onError(error);
    }
}

export const signOut = () => {
    auth.signOut()
        .then(() => {
            console.log("Successfully signed out");
        }).catch((error) => {
        console.log(error);
    });
}

export const getCurrentUserId = () => auth.currentUser ? auth.currentUser.uid : null;

export const getCurrentUserEmail = () => auth.currentUser ? auth.currentUser.email : null;

export const changePassword = async (newPassword, onSuccess, onError) => {
    try {
        await auth.currentUser.updatePassword(newPassword);
        return onSuccess(true);
    } catch (error) {
        Alert.alert(
            "Error",
            error.message,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
        return onError(error);
    }
}

export const changeEmail = async (newEmail, onSuccess, onError) => {
    try {
        await auth.currentUser.updateEmail(newEmail);
        return onSuccess(true);
    } catch (error) {
        Alert.alert(
            "Error",
            error.message,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
        return onError(error);
    }
}

export const deleteUser = () => {
    auth.currentUser.delete().then(() => {
        console.log('User Deleted');
    }).catch((error) => {
        console.log("Error deleting user");
    });
}

// export const getCurrentUsername = () => auth.currentUser ? auth.currentUser.username : null;