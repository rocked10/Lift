import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import CreatePost from '../../screens/createPost';

describe('Testing Create Post Screen', () => {
    const wrapper = renderer.create(<CreatePost />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});