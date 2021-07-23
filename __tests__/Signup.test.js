import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Signup from '../screens/Signup';
import { render, } from "@testing-library/react-native";

describe('Testing Signup Screen', () => {
    const wrapper = renderer.create(<Signup />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it ("Renders elements", () => {   
        const navigate = jest.fn(); 
        const { getByTestId, getByText, getByPlaceholderText} = render(<Signup />);
        getByPlaceholderText('Enter your email...');
        getByPlaceholderText('Enter a username...');
        getByPlaceholderText('Enter a password...');
        getByPlaceholderText('Confirm your password...');
        getByText('I am a...');
        getByTestId('Role Picker')
        getByText('SIGNUP');
    });
});