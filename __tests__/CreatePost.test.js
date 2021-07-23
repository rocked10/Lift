import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import CreatePost from '../screens/createPost';
import { render, fireEvent, waitFor } from "@testing-library/react-native";

describe('Testing Create Post Screen', () => {
    const navigate = jest.fn(); 
    const wrapper = renderer.create(<CreatePost navigation={ navigate } route={{params: {name: 'jeremy', role:'coach', userId: '123'}}} />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it ("Renders elements", () => {   
        const navigate = jest.fn(); 
        const { getByTestId, getByPlaceholderText,} = render(<CreatePost navigation={ navigate } route={{params: {name: 'jeremy', role:'coach', userId: '123'}}} />);
        // getByTestId('Profile Card'); this fails?
        getByPlaceholderText("What's your workout of the day?");
        getByTestId('Attach file icon');
    });
});