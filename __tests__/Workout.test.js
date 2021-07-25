import React from 'react';
import renderer from 'react-test-renderer';
import Workout from "screens/workout";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

describe('Workout', () => {
    it('navigates to add workout on button press', () => {
        const navigate = jest.fn();

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
    });

    const navigate = jest.fn();
    const wrapper = renderer.create(<Workout navigation={{ navigate }} />); 
    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});