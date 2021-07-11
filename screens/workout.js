import React, { useState, useEffect, useRef } from 'react';
import {
    View, Text, TouchableOpacity,
    StatusBar, StyleSheet, Alert, SectionList
} from "react-native";
import { List } from "react-native-paper";
import { globalStyles } from "../styles/global";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from '@expo/vector-icons';
import Card from "../shared/card";
import * as DB from '../api/database';
import * as Auth from '../api/auth.js';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import * as Notifs from "../api/notifications";
import * as Notifications from "expo-notifications";


export default function Workout({ navigation, route }) {
    const [userId, setUserId] = useState(Auth.getCurrentUserId());
    const [workouts, setWorkouts] = useState({});
    const [sectionedWorkouts, setSectionedWorkouts] = useState([]);
    const [role, setRole] = useState('');

    useEffect(() => {
        DB.getUserType(setRole);
    }, [role]);

    useEffect(() => {
        return DB.subscribe(userId, setWorkouts);
    }, []);

    useEffect(() => {
         if (workouts) {
             const sortedWorkouts = [];
             const workoutArray = Object.values(workouts).reverse();
             const isCompletedWorkout = (workout) => {
                 return workout.exercises.every(exercise => isCompletedExercise(exercise))
             }
             const isCompletedExercise = (exercise) => {
                 return exercise.tableData.every(set => set.completed)
             }
             const completedWorkouts = workoutArray.filter((workout) => isCompletedWorkout(workout));
             const pendingWorkouts = workoutArray.filter((workout) => ! isCompletedWorkout(workout));
             const unseenWorkouts = workoutArray.filter((workout) => workout.unseen);

             if (pendingWorkouts.length > 0) {
                 sortedWorkouts.push({ title: 'Pending', data: pendingWorkouts });
             }
             if (completedWorkouts.length > 0) {
                 sortedWorkouts.push({ title: 'Completed', data: completedWorkouts });
             }

             if (unseenWorkouts.length > 0) {
                 unseenWorkouts.forEach(workout => {
                     Notifs.schedulePushNotification(workout); // Schedules notification for each workout
                     DB.seenWorkout(userId, workout.id).then(); // Updates workout that shows that workout has been seen
                 });
             }

             setSectionedWorkouts(sortedWorkouts);
         } else {
             setSectionedWorkouts([]); // Ensures that if last workout is deleted sectioned Workouts will refresh
         }
    }, [workouts]);


    // init notifications
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        Notifs.registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            const workout = response.notification.request.content.data;
            navigation.navigate('Workout Details', {
                workoutTitle: workout.workoutTitle,
                exercises: workout.exercises,
                id: workout.id,
                forViewingOnly: false,
                _completionStatus: workout.exercises.map(exercise => {
                    let arr = [];
                    for (let i = 0; i < exercise.tableData.length; i++) {
                        arr.push(exercise.tableData[i].completed);
                    }
                    return arr;
                }),
            });
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);


    const handleAddWorkout = (workout) => {
        DB.addWorkout(userId, workout).then();
    }

    const handleEditWorkout = (workout) => {
        console.log(workout.id)
        DB.editWorkout(userId, workout.id, workout).then();
    }

    const handleDeleteWorkout = (workout) => {
        DB.deleteWorkout(userId, workout.id).then();
    }

    const handleSelect = (workout, addWorkout, createsANewWorkout, reusingWorkout, reusingTemplate) => navigation.navigate('WorkoutForm', {
        workout: workout,
        addWorkout: addWorkout,
        createsANewWorkout: createsANewWorkout,
        reusingWorkout: reusingWorkout,
        reusingTemplate: reusingTemplate,
    })

    function DropDownSelection({ workout }) {
        // console.log(workout.exercises)

        return (
            <Menu>
                <MenuTrigger hitSlop={{ top: 20, bottom: 50, left: 60, right: 50 }} >
                    <Octicons name="kebab-horizontal" size={26} color="black" />
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyles}>
                    <MenuOption
                        customStyles={optionStyles}
                        onSelect={() => handleSelect(workout, handleEditWorkout, false, false, false)}
                        text='Edit Workout'
                    />
                    <MenuOption
                        customStyles={optionStyles}
                        onSelect={() => handleSelect(workout, handleAddWorkout, true, true, false)}
                        text='Reuse Workout'
                    />
                    <MenuOption
                        customStyles={optionStyles}
                        onSelect={() => handleSelect(workout, handleAddWorkout, true, false, true)}
                        text='Reuse Template'
                    />
                    <MenuOption
                        onSelect={() => Alert.alert(
                            '',
                            'Delete your workout?',
                            [
                                {
                                    text: "Cancel",
                                    style: "cancel",
                                },

                                {
                                    text: "Delete",
                                    onPress: () => handleDeleteWorkout(workout),
                                    style: "delete",
                                }
                            ]
                        )}
                        customStyles={optionStyles}
                    >
                        <Text style={{ color: 'red' }}>Delete</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        )
    }

    return (
        <View style={globalStyles.container}>
            <TouchableOpacity
                style={{ alignItems: 'flex-end' }}
                onPress={() => navigation.navigate('WorkoutForm', {
                    workout: {
                        workoutTitle: '',
                        exercises: []
                    },
                    addWorkout: handleAddWorkout,
                    createsANewWorkout: true,
                })}
            >
                <MaterialIcons name='add' size={28} />
            </TouchableOpacity>

            <SectionList
                showsVerticalScrollIndicator={false}
                renderSectionHeader={({ section: { title } }) => <List.Subheader style={{ fontFamily: 'lato-bold' }}>{title} workouts</List.Subheader>}
                sections={sectionedWorkouts}
                renderItem={({ item, index }) => {
                    if (item.exercises !== undefined) {
                        let items = item.exercises.map(item2 => {
                            return (
                                <Text
                                    style={globalStyles.cardText}
                                    key={Math.random()}
                                >
                                    {item2.exerciseName}
                                </Text>
                            );
                        });

                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('Workout Details', {
                                workoutTitle: item.workoutTitle,
                                exercises: item.exercises,
                                id: item.id,
                                forViewingOnly: false,
                                _completionStatus: item.exercises.map(exercise => {
                                    let arr = [];
                                    for (let i = 0; i < exercise.tableData.length; i++) {
                                        arr.push(exercise.tableData[i].completed);
                                    }
                                    return arr;
                                    }),
                            })}>
                                <Card>
                                    <View style={styles.cardHeader}>
                                        <Text style={globalStyles.titleText}>{item.workoutTitle}</Text>
                                        <DropDownSelection workout={item} />
                                    </View>
                                    {items}
                                </Card>
                            </TouchableOpacity>
                        );
                    }
                }}
                keyExtractor={(item, index) => item + index}
            />
            <StatusBar />

        </View>

    );
}

const styles = StyleSheet.create({
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

const optionsStyles = {
    optionsContainer: {
        backgroundColor: '#f5f5f5',
        width: 160,
        borderRadius: 4,
        padding: 4,
    },
};

const optionStyles = {
    optionText: {
        color: 'black',
        fontWeight: 'bold'
    },
};
