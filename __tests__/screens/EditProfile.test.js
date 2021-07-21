import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import EditProfile from '../../screens/editProfile';

describe('Testing Edit Profile Screen', () => {
    const wrapper = renderer.create(<EditProfile />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});