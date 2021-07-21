import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ChangePassword from '../../screens/changePassword';

describe('Testing Change Password Screen', () => {
    const wrapper = renderer.create(<ChangePassword />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});