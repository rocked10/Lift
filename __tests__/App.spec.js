import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App.js';

const {act} = renderer;

describe('<App />', () => {
  it('App should render correctly', async () => {
    await act(async () => {
      const tree = renderer.create(<App />).toJSON();
      expect(tree).toMatchSnapshot();
    })
  });
});
  