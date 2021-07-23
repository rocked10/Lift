import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ShareWorkout from '../screens/shareWorkout';

describe('Testing Share Workout Screen', () => {
    const wrapper = renderer.create(<ShareWorkout shareId=''/>);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});