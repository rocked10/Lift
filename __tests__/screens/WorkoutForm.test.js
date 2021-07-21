import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import WorkoutForm from '../../screens/workoutForm';

describe('Testing Workout Form Screen', () => {
    const wrapper = renderer.create(<WorkoutForm />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});