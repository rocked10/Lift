import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import WorkoutDetails from '../../screens/workoutDetails';

describe('Testing Workout Details Screen', () => {
    const wrapper = renderer.create(<WorkoutDetails />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});