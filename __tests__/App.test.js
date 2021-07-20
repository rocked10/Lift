import React from 'react';
import renderer from 'react-test-renderer';
import { act } from "react-native-testing-library";
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import App from '../App';

describe('<App />', () => {
    it('App should render correctly', async () => {
        await act(async() => {
            const tree = renderer.create(<App />).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });

    it('Renders Loading Screen if login status is not determined', async () => {
        const { getByTestId } = render(<App />);
        await waitFor(() => getByTestId('Loading Indicator'));
    });

    it('Renders Workout Screen if logged in', async () => { // This test also ensures TabStack returns the correct stack, and tests that WorkoutStack returns the correct screen
        const { getByTestId } = render(<App testLogin='1'/> );
        await waitFor(() => getByTestId('Add Workout')); // looks for add workout button
    });

    it('Renders Login Screen if not logged in', async () => {
        const { getByTestId } = render(<App testLogin='0'/> );
        await waitFor(() => getByTestId('Login Button')); // looks for login button
    });
});