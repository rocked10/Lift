import React from 'react';

import Workout from "screens/workout";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

describe('Workout', () => {
    it('navigates to add workout on button press', () => {
        const navigate = jest.fn();
        const handleAddWorkout = () => {}

        const { getByTestId } = render(<Workout navigation={{ navigate }} />);
        fireEvent.press(getByTestId('Add Workout'));
        expect(navigate).toHaveBeenCalledWith('WorkoutForm', {
            workout: {
                workoutTitle: '',
                    exercises: []
            },
            addWorkout: expect.any(Function),
                createsANewWorkout: true,
        });
    })
});