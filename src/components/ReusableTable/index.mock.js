export const mockColumns = [
  { name: 'normal', label: 'Normal', width: 200 },
  {
    name: 'cell',
    label: 'with cell',
    cell: () => <div>test</div>,
    width: 50,
  },
  { name: 'ex_sort', label: 'withSort', width: 200, sort: true },
];

export const mockRows = [
  {
    id: 1,
    normal: '1',
    cell: 'cell',
    ex_sort: '1',
  },
  {
    id: 2,
    normal: '2',
    cell: 'cel2',
    ex_sort: '2',
  },
];
