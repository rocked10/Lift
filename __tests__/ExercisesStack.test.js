import React from 'react';

import ExercisesStack from "../routes/exercisesStack";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

describe('ExercisesStack', () => {
    it ('renders the workout screen first', async () => {
        const { getByTestId } = render(
            <NavigationContainer>
                <ExercisesStack />
            </NavigationContainer>
        );
        await waitFor(() => getByTestId('Search Exercise'));
    });
});