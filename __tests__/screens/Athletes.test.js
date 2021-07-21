import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Athletes from '../../screens/athletes';

describe('Testing Athletes Screen', () => {
    const wrapper = renderer.create(<Athletes />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});