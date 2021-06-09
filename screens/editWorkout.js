import React, { useState, useEffect } from 'react';
import {
    View, Text, Button, FlatList, TouchableOpacity,
    Modal, StatusBar, TouchableWithoutFeedback, Keyboard, StyleSheet
} from "react-native";
import { ListItem } from 'react-native-elements';
import { globalStyles, loginStyles } from "../styles/global";
import { MaterialIcons } from "@expo/vector-icons";
import Card from "../shared/card";
import WorkoutForm from "./workoutForm";
import firebaseApp from "../api/firebase";
import * as DB from '../api/database';
import * as Auth from '../api/auth.js'

export default function editWorkout({ route, navigation }) {
    const { title, exercises } = route.params;

    return (
        <WorkoutForm _workoutTitle={title} _exercises={exercises} alreadyPreFilled={true} />
    )
}