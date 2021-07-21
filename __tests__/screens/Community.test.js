import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Community from '../../screens/community';

describe('Testing Community Screen', () => {
    const wrapper = renderer.create(<Community />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});