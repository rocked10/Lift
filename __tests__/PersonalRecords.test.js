import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import PersonalRecords from '../screens/personalRecords';

describe('Testing Personal Records Screen', () => {
    const navigate = jest.fn();
    const wrapper = renderer.create(<PersonalRecords navigation={navigate} route={{params: {_recordsToDisplay: ''}}} />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});