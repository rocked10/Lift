import React from 'react';
import renderer from 'react-test-renderer';
import Profile from "../screens/profile";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

describe('Profile', () => {
    it('navigates to edit profile on button press', () => {
        const navigate = jest.fn();
        const { getByTestId } = render(<Profile navigation={{ navigate }} route={false} />);
        fireEvent.press(getByTestId('Edit Profile Button'));
        expect(navigate).toHaveBeenCalledWith('Edit Profile', {
            userProfile: expect.any(Object)
        });
    });

    const navigate = jest.fn();
    const wrapper = renderer.create(<Profile navigation={{ navigate }} route={false} />); 
    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it ("Renders elements", () => {   
        const navigate = jest.fn(); 
        const { getByTestId, getAllByText, getByText, } = render(<Profile navigation={{ navigate }} route={false} />);
        getByTestId('Profile Picture');
        getByTestId('name');
        getByTestId('role');
        getByTestId('bio');
        getByText('Personal Records')
    });
});