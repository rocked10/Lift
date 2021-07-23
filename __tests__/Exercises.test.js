import React from 'react';
import renderer from 'react-test-renderer';
import Exercises from "../screens/exercises";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

describe('Exercises', () => {
    it('navigates to custom exercise screen on button press', () => {
        const navigate = jest.fn();
        const { getByTestId } = render(<Exercises navigation={{ navigate }} />);
        fireEvent.press(getByTestId('Add Custom Exercise'));
        expect(navigate).toHaveBeenCalledWith('Custom Exercise', {
            categoryExercisesSetters: expect.any(Array)
        });
    });

    const navigate = jest.fn();
    const wrapper = renderer.create(<Exercises navigation={ navigate } />); 
    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it ("Renders elements", () => {    
        const navigate = jest.fn();
        const { getByTestId, } = render(<Exercises navigation={{ navigate }} />);
        getByTestId('Search Exercise');
        getByTestId('Add Custom Exercise');
        getByTestId('Exercises');
    });
});