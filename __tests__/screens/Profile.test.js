import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Profile from '../../screens/profile';

describe('Testing Profile Screen', () => {
    const wrapper = renderer.create(<Profile />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});