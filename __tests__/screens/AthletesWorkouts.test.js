import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import AthletesWorkouts from '../../screens/athletesWorkouts';

describe('Testing Athletes Workouts Screen', () => {
    const wrapper = renderer.create(<AthletesWorkouts />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});