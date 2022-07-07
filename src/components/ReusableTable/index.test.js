import React from 'react';
import { shallow } from 'enzyme';
import ReusableTable from '.';
import { mockRows, mockColumns } from './index.mock';
import EmptyHolder from '../EmptyHolder';

const setUp = (props) => {
  const component = shallow(<ReusableTable {...props} />);
  return component;
};

describe('<ReusableTable />', () => {
  describe('It should mount', () => {
    let wrapper1;

    beforeEach(() => {
      wrapper1 = setUp({});
    });

    test('It should mount', () => {
      expect(wrapper1.length).toBe(1);
    });
    test('It should call component empty holder', () => {
      expect(wrapper1.find(EmptyHolder).length).toBe(1);
    });
  });

  describe('table with data', () => {
    let wrapper2;

    beforeEach(() => {
      wrapper2 = setUp({ columns: mockColumns, rows: mockRows });
    });

    test('should render table correctly', () => {
      const index = 0;
      const selector = `[data-testid="body-row-${index}"]`;
      const text = Object.values(mockRows[index])[0];
      expect(wrapper2.find(selector).length).toBe(1);
      expect(wrapper2.find(selector).children().length).toBe(mockColumns.length);
      expect(wrapper2.find(selector).children().first().text()).toBe(String(text));
    });

    test('should render rows correctly', () => {
      const selector = `[data-testgroup="body-row"]`;
      expect(wrapper2.find(selector).length).toBe(mockRows.length);
    });

    test('should changes sorting to be asc then desc and then default (empty string)', async () => {
      const prop = 'onClick';
      const column = 'ex_sort';
      const selector = `[data-testid="table-head-${column}"]`;
      wrapper2.find(selector).invoke(prop)(column);
      expect(wrapper2.find(selector).prop('direction')).toBe('asc');
      wrapper2.find(selector).invoke(prop)(column);
      expect(wrapper2.find(selector).prop('direction')).toBe('desc');
      wrapper2.find(selector).invoke(prop)(column);
      expect(wrapper2.find(selector).prop('direction')).toBe('');
    });
  });

  describe('table if loading', () => {
    let wrapper3;

    beforeEach(() => {
      wrapper3 = setUp({ loading: true });
    });

    test('call component loading', () => {
      const selector = `[data-testid="table-skeleton"]`;
      expect(wrapper3.find(selector).length).toBe(1);
    });
  });
});
