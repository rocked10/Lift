import React from 'react';

import CommunityStack from "../routes/communityStack";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

describe('CommunityStack', () => {
    it ('renders the workout screen', async () => {
        const { getByTestId } = render(
            <NavigationContainer>
                <CommunityStack />
            </NavigationContainer>
        );
        await waitFor(() => getByTestId('Add Post'));
    });
});