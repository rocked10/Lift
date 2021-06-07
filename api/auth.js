import firebase from 'firebase';

const auth = firebase.auth();

export const getCurrentUserId = () => auth.currentUser ? auth.currentUser.uid : null;

export const getCurrentUserEmail = () => auth.currentUser ? auth.currentUser.email : null;