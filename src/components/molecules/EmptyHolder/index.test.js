import React from 'react';
import { shallow } from 'enzyme';
import EmptyHolder from '.';

describe('<EmptyHolder />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<EmptyHolder />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
