import firebase from 'firebase';
import { Alert } from "react-native";

const auth = firebase.auth();

export const signIn = async({ email, password }, onSuccess, onError ) => {
    try {
        const { user } = await auth.signInWithEmailAndPassword(email, password);
        console.log(email);
        console.log(password);
        return onSuccess(user);
    } catch (error) {
        return onError(error);
    }
}

export const getCurrentUserId = () => auth.currentUser ? auth.currentUser.uid : null;

export const getCurrentUserEmail = () => auth.currentUser ? auth.currentUser.email : null;

export const changePassword = (newPassword) => auth.currentUser.updatePassword('password').then(() => {
    Alert.alert(
        "Password successfully changed!",
        "Press OK to go back",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
}).catch((error) => {
    Alert.alert(
        "Error",
        error.message,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
});

export const changeEmail = (newEmail) => auth.currentUser.updateEmail(newEmail).then(() => {
    Alert.alert(
        "Email successfully changed!",
        "Press OK to go back",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
}).catch((error) => {
    Alert.alert(
        "Error",
        error.message,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
})

export const deleteUser = () => {
    auth.currentUser.delete().then(() => {
        console.log('User Deleted');
    }).catch((error) => {
        console.log("Error deleting user");
    });
}

// export const getCurrentUsername = () => auth.currentUser ? auth.currentUser.username : null;