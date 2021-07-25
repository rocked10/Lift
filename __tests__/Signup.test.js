import React from 'react';
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import renderer from 'react-test-renderer';

import Signup from "screens/signup";

describe('Sign up', () => {
    const wrapper = renderer.create(<Signup/>);

    it ('Sign up form submits correctly', async () => {
        const handleSubmit = jest.fn();
        const {getByTestId, getByPlaceholderText} = render(<Signup testing={true} handleSubmit={handleSubmit}/>);

        fireEvent.changeText(getByPlaceholderText('Enter your email...'), 'Test Email');
        fireEvent.changeText(getByPlaceholderText('Enter a username...'), 'Test Username');
        fireEvent.changeText(getByPlaceholderText('Enter a password...'), 'Test Password');
        fireEvent.changeText(getByPlaceholderText('Confirm your password...'), 'Test Password');

        fireEvent.press(getByTestId('Sign Up Button'));

        await waitFor(() => {
            expect(handleSubmit).toHaveBeenCalledWith(
                expect.objectContaining({
                    email: 'Test Email',
                    password: 'Test Password',
                    password2: 'Test Password',
                    role: 'Coach',
                    username: 'Test Username'
                }),
                expect.any(Object),
            );
        });
    });

    it ('Should render', () => {
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