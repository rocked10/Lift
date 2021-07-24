import React from 'react';

import ProfileStack from "routes/profileStack";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

describe('ProfileStack', () => {
    const navigate = jest.fn();

    it ('renders the profile screen and tests settings button navigation', async () => {
        const { getByText, getByTestId } = render(
            <NavigationContainer>
                <ProfileStack navigation={{navigate}} />
            </NavigationContainer>
        );
        await waitFor(() => getByText('Personal Records'));

        // Settings Button Test
        fireEvent.press(getByTestId('Settings Button'));
        expect(navigate).toHaveBeenCalledWith('Profile', { screen: 'Settings' });
    });
});