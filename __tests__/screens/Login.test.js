import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../../screens/login';

describe('Testing Login Screen', () => {
    const wrapper = renderer.create(<Login />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});