import React from 'react';
import {
    View, Modal, TouchableWithoutFeedback, Keyboard, 
} from "react-native";
import { globalStyles } from "../styles/global";
import { MaterialIcons } from "@expo/vector-icons";

import WorkoutForm from "../screens/workoutForm";

export default function WorkoutFormModal(
    { modalOpen, 
        setModalOpen, 
        workoutTitle='', 
        exercises = [
            {
                exerciseName: '',
                tableData: [
                    { row: 0, column: 0, value: 0 },
                    { row: 0, column: 1, value: 0 },
                ]
            },
        ],
        addWorkout, 
        createsANewWorkout = true }) {

    return (
        <View style={{ padding: 8 }}>
            <Modal visible={modalOpen} animationType='slide' >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={globalStyles.modalContent}>
                        <MaterialIcons
                            name='close'
                            size={26}
                            style={{ ...globalStyles.modalToggle, ...globalStyles.modalClose }}
                            onPress={() => setModalOpen(false)}
                        />
                        <WorkoutForm
                            _workoutTitle= {workoutTitle}
                            _exercises= {exercises}
                            addWorkout={addWorkout}
                            createsANewWorkout= {createsANewWorkout}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}

// *****Let's leave this here in case anything fks up********* // lmao //

// function EditWorkoutModal() {
//     if (workouts != null && idOfWorkoutBeingEdited != -1) {
//         const workout = workouts[idOfWorkoutBeingEdited]
//         return (
//             <View style={{ padding: 8 }}>
//                 <Modal visible={editWorkoutModalOpen} animationType='slide' >
//                     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                         <View style={globalStyles.modalContent}>
//                             <MaterialIcons
//                                 name='close'
//                                 size={26}
//                                 style={{ ...globalStyles.modalToggle, ...globalStyles.modalClose }}
//                                 onPress={() => setEditWorkoutModalOpen(false)}
//                             />
//                             <WorkoutForm
//                                 _workoutTitle={workout.workoutTitle}
//                                 _exercises={workout.exercises}
//                                 addWorkout={handleEditWorkout}
//                                 alreadyPreFilled={true}
//                             />
//                         </View>
//                     </TouchableWithoutFeedback>
//                 </Modal>
//             </View>
//         )
//     } else {
//         return <View></View>
//     }
// }

// function AddWorkoutModal() {
//     return (
//         <View style={{ padding: 8 }}>
//             <Modal visible={addWorkoutModalOpen} animationType='slide' >
//                 <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                     <View style={globalStyles.modalContent}>
//                         <MaterialIcons
//                             name='close'
//                             size={26}
//                             style={{ ...globalStyles.modalToggle, ...globalStyles.modalClose }}
//                             onPress={() => setAddWorkoutModalOpen(false)}
//                         />
//                         <WorkoutForm addWorkout={handleAddWorkout} />
//                     </View>
//                 </TouchableWithoutFeedback>
//             </Modal>
//         </View>
//     )
// }