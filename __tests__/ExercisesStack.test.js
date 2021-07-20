import React from 'react';

import { TabStack } from "routes/tabStack";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

describe('TabStack', () => {
    it ('renders the workout screen first', async () => {
        const { getByTestId } = render(
            <TabStack />
        );
        await waitFor(() => getByTestId('Add Workout'));
    });
});