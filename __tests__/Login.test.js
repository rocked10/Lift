import 'react-native';
import React from 'react';
import { Alert } from 'react-native';
import renderer from 'react-test-renderer';
import Login from '../screens/login';
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";

describe('Testing Login Screen', () => {
    const handleLogin = jest.fn();
    const wrapper = renderer.create(<Login userDetails={handleLogin} />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it ("Renders elements", () => {    
        const { getByTestId, getAllByText, getByPlaceholderText, } = render(<Login userDetails={handleLogin} />);
        getByTestId('Lift Logo');
        getByPlaceholderText("Email...");
        getByPlaceholderText("Password...");
        expect(getAllByText("LOGIN").length).toBe(1);
        expect(getAllByText("SIGNUP").length).toBe(2);
    });

    it("Workout screen does not show if user tries to login without email and password", async () => {
        const { queryByTestId, getByTestId} = render(<Login userDetails={handleLogin} />);
        await waitFor(() => fireEvent.press(getByTestId("Login Button")));
        expect(queryByTestId('Add Workout')).toBeNull();
    })
});

