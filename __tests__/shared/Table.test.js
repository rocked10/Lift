import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import TableCell from '../shared/table/TableCell';

describe('Testing table cell', () => {
    const value = 10;
    const editable = true; 
    const keyboardType = 'phone-pad';
    const wrapper = renderer.create(<TableCell value={value} editable={editable} keyboardType={keyboardType} />);

    it('Should render', () => {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});