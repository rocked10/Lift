import React from 'react';

import ProfileStack from "routes/profileStack";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

describe('ProfileStack', () => {
    it ('renders the profile screen', async () => {
        const { getByText } = render(
            <NavigationContainer>
                <ProfileStack />
            </NavigationContainer>
        );
        await waitFor(() => getByText('Personal Records'));
    });
});