import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Exercises from '../../screens/exercises';

describe('Testing Exercises Screen', () => {
    const wrapper = renderer.create(<Exercises />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});