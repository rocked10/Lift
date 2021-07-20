import React from 'react';

import Profile from "../screens/profile";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

describe('Profile', () => {
    it('navigates to add post on button press', () => {
        const navigate = jest.fn();
        const { getByTestId } = render(<Profile navigation={{ navigate }} route={false} />);
        fireEvent.press(getByTestId('Edit Profile Button'));
        expect(navigate).toHaveBeenCalledWith('Edit Profile', {
            userProfile: expect.any(Object)
        });
    });
});