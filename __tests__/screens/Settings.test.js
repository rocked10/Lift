import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Settings from '../../screens/settings';

describe('Testing Settings Screen', () => {
    const wrapper = renderer.create(<Settings />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});