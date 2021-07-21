import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Signup from '../../screens/Signup';

describe('Testing Signup Screen', () => {
    const wrapper = renderer.create(<Signup />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});