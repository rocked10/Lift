import React from 'react';

import WorkoutStack from "routes/workoutStack";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

describe('WorkoutStack', () => {
    it ('renders the workout screen', async () => {
        const { getByTestId } = render(
            <NavigationContainer>
                <WorkoutStack />
            </NavigationContainer>
        );
        await waitFor(() => getByTestId('Add Workout'));
    });
});