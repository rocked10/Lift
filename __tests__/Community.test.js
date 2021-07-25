import React from 'react';

import Community from "screens/community";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

describe('Community', () => {
    it('navigates to add post on button press', () => {
        const navigate = jest.fn();
        const { getByTestId } = render(<Community navigation={{ navigate }} />);
        fireEvent.press(getByTestId('Add Post'));
        expect(navigate).toHaveBeenCalledWith('Create Post', {
            name: undefined,
            role: undefined,
            userId: null,
        });
    })

    it ("Renders elements", () => {    
        const navigate = jest.fn();
        const { getByTestId, } = render(<Community navigation={{ navigate }} />);
        getByTestId('Add Post');
    });
});