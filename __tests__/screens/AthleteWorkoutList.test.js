import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import AthletesWorkoutsList from '../../screens/athletesWorkoutsList';

describe('Testing Athletes Workouts List Screen', () => {
    const wrapper = renderer.create(<AthletesWorkoutsList />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});