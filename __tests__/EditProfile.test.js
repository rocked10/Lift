import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import EditProfile from '../screens/editProfile';

describe('Testing Edit Profile Screen', () => {
    const navigate = jest.fn();
    const wrapper = renderer.create(<EditProfile navigation={navigate} route={{params: {userProfile: false}}}/>);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});