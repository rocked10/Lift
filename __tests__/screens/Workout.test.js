import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Workout from '../../screens/workout';

describe('Testing Workout Screen', () => {
    const wrapper = renderer.create(<Workout />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});