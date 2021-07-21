import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import PersonalRecords from '../../screens/personalRecords';

describe('Testing Personal Records Screen', () => {
    const wrapper = renderer.create(<PersonalRecords />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});