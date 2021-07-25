import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import PlatesCalculator from '../screens/platesCalculator';
import {generatePlatesRequired} from '../screens/platesCalculator';

describe('Testing Plates Calculator', () => {
    const wrapper = renderer.create(<PlatesCalculator />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it('Testing plate generator function', () => {
        expect(generatePlatesRequired(200, [25, 20])).toEqual([25,25,25,25,25,25,25,25]);
        expect(generatePlatesRequired(100, [20])).toEqual([20,20,20,20,20]);
        expect(generatePlatesRequired(97.5, [20,10,5,1.5,1.25])).toEqual([1.25,1.25,5,10,20,20,20,20]);
        expect(generatePlatesRequired(91.5, [25,20,10,5,1.5])).toEqual([1.5,20,20,25,25]); 
        expect(generatePlatesRequired(87.5, [25,20,15,10,5,2.5,2])).toEqual([2.5,10,25,25,25]);
        expect(generatePlatesRequired(75, [15,10,5,2.5])).toEqual([15,15,15,15,15]);
        expect(generatePlatesRequired(72.5, [15,10,5,2.5])).toEqual([2.5,10,15,15,15,15]);
        expect(generatePlatesRequired(71, [15,10,5,2.5])).toEqual([-1]);
        expect(generatePlatesRequired(71, [15,10,5,2.5,1])).toEqual([1,10,15,15,15,15]);
        expect(generatePlatesRequired(71, [15,10,5,2.5,1])).toEqual([1,10,15,15,15,15]);
    })
});