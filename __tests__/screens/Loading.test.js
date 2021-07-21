import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Loading from '../../screens/loading';

describe('Testing Loading Screen', () => {
    const wrapper = renderer.create(<Loading />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});