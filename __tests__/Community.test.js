import React from 'react';
import renderer from 'react-test-renderer';
import { act } from "react-native-testing-library";

import { CommunityCard } from 'shared/communityCard';

describe('Community Card', () => {
    it('onPress should trigger accordingly', () => {
        const card = create(<CommunityCard onPress={() => console.log('Card Pressed')}/>);
        act(() => card.onPress());

        expect()
    })
});