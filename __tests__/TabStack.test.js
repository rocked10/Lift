import React from 'react';

import { TabStack } from "routes/tabStack";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

describe('TabStack', () => {
    const { getByTestId, getByText } = render(
        <TabStack />
    );

    it ('renders all four tabs', async () => {
        await waitFor(() => getByTestId('Profile Tab', 'Workout Tab', 'Exercises Tab', 'Community Tab'));
    });
});