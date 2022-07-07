import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<App />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });

  describe('It should render Routes', () => {
    let deepRoutes;
    beforeEach(() => {
      deepRoutes = component.children().children();
    });

    test('render length route', () => {
      expect(deepRoutes.length).toBe(1);
    });

    const cases = [[0, '/']];

    test.each(cases)('render route index [%p], returns path %p', (index, expected) => {
      expect(deepRoutes.at(index).prop('path')).toBe(expected);
    });
  });
});
