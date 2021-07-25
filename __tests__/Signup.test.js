import React from 'react';
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import renderer from 'react-test-renderer';

import Signup from "screens/signup";

describe('Sign up', () => {
    it('Sign up form submits correctly', async () => {
        const handleSubmit = jest.fn();
        const { getByTestId, getByPlaceholderText } = render(<Signup testing={true} handleSubmit={handleSubmit} />);
        const wrapper = renderer.create(<Signup />);

        fireEvent.changeText(getByPlaceholderText('Enter your email...'), 'fuck');
        fireEvent.changeText(getByPlaceholderText('Enter a username...'), 'fuck');
        fireEvent.changeText(getByPlaceholderText('Enter a password...'), 'fuck');
        fireEvent.changeText(getByPlaceholderText('Confirm your password...'), 'fuck');
        fireEvent.changeText(getByPlaceholderText('Enter your email...'), 'fuck');

        fireEvent.press(getByTestId('Sign Up Button'));

        await waitFor(() => {
            expect(handleSubmit).toHaveBeenCalledWith({
                email: 'fuck',
                password: 'fuck',
                password2: 'fuck',
                role: 'Coach',
                // username: 'fuck'
            });
        });

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