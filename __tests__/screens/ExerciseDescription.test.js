import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ExerciseDescription from '../../screens/exerciseDescription';

describe('Testing Exercise Description Screen', () => {
    const wrapper = renderer.create(<ExerciseDescription />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});