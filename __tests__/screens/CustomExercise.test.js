import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import CustomExercise from '../../screens/customExercise';

describe('Testing Custom Exercise Screen', () => {
    const wrapper = renderer.create(<CustomExercise />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});