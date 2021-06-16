import firebase from 'firebase';
import {Alert} from "react-native";

const auth = firebase.auth();

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

// export const getCurrentUsername = () => auth.currentUser ? auth.currentUser.username : null; 