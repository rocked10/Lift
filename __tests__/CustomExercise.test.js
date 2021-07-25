import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { render, } from "@testing-library/react-native";
import CustomExercise from '../screens/customExercise';

describe('Testing Custom Exercise Screen', () => {
    const navigate = jest.fn();
    const wrapper = renderer.create(<CustomExercise navigation={navigate} route={{params: {categoryExercisesSetters: false}}} />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it ("Renders elements", () => {   
        const navigate = jest.fn(); 
        const { getByTestId, getByText, getByPlaceholderText} = render(
                <CustomExercise
                    navigation={navigate}
                    route={{params: {categoryExercisesSetters: false}}}
                />
            );
        getByPlaceholderText('Exercise Name');
        getByPlaceholderText('Youtube Link (Optional)');
        getByTestId('Category Picker');
        getByText('CREATE NEW EXERCISE!')
    });
});