import React from 'react';
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";

import Signup from "screens/signup";

describe('Sign up', () => {
    it('Sign up form submits correctly', async () => {
        const handleSubmit = jest.fn();
        const { getByTestId, getByPlaceholderText } = render(<Signup testing={true} handleSubmit={handleSubmit} />);

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
    });
});