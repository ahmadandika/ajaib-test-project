import React from 'react';
import { shallow } from 'enzyme';
import TableSkeleton from '.';

describe('<TableSkeleton />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<TableSkeleton />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });

  test('It should render column table head', () => {
    expect(component.find('[data-testid="table-column"]').length).toBe(5);
  });
  test('It should render column table body', () => {
    expect(component.find('[data-testid="table-cell"]').length).toBe(30);
  });
  test('It should render column table row', () => {
    expect(component.find('[data-testid="table-row"]').length).toBe(6);
  });
});
