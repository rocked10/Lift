import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ChangeEmail from '../../screens/changeEmail';

describe('Testing Change Email Screen', () => {
    const wrapper = renderer.create(<ChangeEmail />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});