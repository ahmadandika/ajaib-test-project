import React from 'react';
import { shallow } from 'enzyme';
import * as services from 'services';
import Home from '.';

const mockData = [
  {
    login: { username: 'a1' },
    name: { first: 'a', last: 'z' },
    email: 'a@email.com',
    gender: 'male',
    registered: { date: '05/05/2013' },
  },
  {
    login: { username: 'b2' },
    name: { first: 'b', last: 'y' },
    email: 'b@email.com',
    gender: 'female',
    registered: { date: '06/05/2013' },
  },
];

describe('<Home />', () => {
  let component;
  let useEffectSpy;
  let getUserSpy;

  beforeEach(() => {
    getUserSpy = jest.spyOn(services, 'getUser');
    getUserSpy.mockImplementationOnce(() => Promise.resolve({ data: { results: mockData } }));
    useEffectSpy = jest.spyOn(React, 'useEffect');
    useEffectSpy.mockImplementationOnce((f) => f());
    component = shallow(<Home />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });

  test('It should call service', () => {
    expect(getUserSpy).toBeCalled();
  });

  test('It should mount table pagination', () => {
    expect(component.find('[data-testid="table-pagination"]').length).toBe(1);
  });

  test('It input search change', async () => {
    const input = component.find('[data-testid="search-input"]');
    input.invoke('onChange')({ target: { value: 'a' } });
    await new Promise((r) => setTimeout(r, 1000));
    expect(getUserSpy).toBeCalled();
  });

  test('It input filter gender', async () => {
    const select = component.find('[data-testid="filter-gender"]');
    select.invoke('onChange')({ target: { value: 'male' } });
    await new Promise((r) => setTimeout(r, 1000));
    expect(getUserSpy).toBeCalled();
  });

  test('test sort', async () => {
    const table = component.find('[data-testid="table"]');
    table.invoke('onSorting')('name', 'asc');
    await new Promise((r) => setTimeout(r, 1000));
    expect(getUserSpy).toBeCalled();
  });

  test('test reset', async () => {
    const button = component.find('[data-testid="reset-btn"]');
    button.invoke('onClick')();
    await new Promise((r) => setTimeout(r, 1000));
    expect(getUserSpy).toBeCalled();
  });
});
