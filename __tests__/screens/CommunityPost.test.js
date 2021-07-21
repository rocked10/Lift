import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import CommunityPost from '../../screens/communityPost';

describe('Testing Athletes Workouts Screen', () => {
    const wrapper = renderer.create(<CommunityPost />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});