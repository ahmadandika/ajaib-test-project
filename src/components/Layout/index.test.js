import React from 'react';
import { shallow } from 'enzyme';
import Layout from '.';

describe('<Layout />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Layout />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
