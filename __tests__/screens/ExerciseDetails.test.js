import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ExerciseDetails from '../../screens/exerciseDetails';

describe('Testing Exercise Details Screen', () => {
    const wrapper = renderer.create(<ExerciseDetails />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});