import React from 'react';

import Exercises from "../screens/exercises";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

describe('Exercises', () => {
    it('navigates to add post on button press', () => {
        const navigate = jest.fn();
        const { getByTestId } = render(<Exercises navigation={{ navigate }} />);
        fireEvent.press(getByTestId('Add Custom Exercise'));
        expect(navigate).toHaveBeenCalledWith('Custom Exercise', {
            categoryExercisesSetters: expect.any(Array)
        });
    });
});