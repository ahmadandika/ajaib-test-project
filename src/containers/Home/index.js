import React from 'react';
import ReusableTable from 'components/ReusableTable';
import { getUser } from 'services';
import { Box } from '@mui/material';
import Filter from './components/Filter';

const App = () => {
  const [rows, setRows] = React.useState([]);

  const columns = [
    {
      label: 'Username',
      sortable: true,
      sortField: '',
      name: 'login.username',
      minWidth: 110,
    },
    {
      label: 'Name',
      sortable: true,
      sortField: '',
      name: 'name',
      minWidth: 110,
      cell: ({ item }) => {
        return <div>{`${item.name.first} ${item.name.last}`}</div>;
      },
    },
    {
      label: 'Email',
      sortable: true,
      sortField: '',
      name: 'email',
      minWidth: 110,
    },
    {
      label: 'Gender',
      sortable: true,
      sortField: '',
      name: 'gender',
      minWidth: 110,
    },
    {
      label: 'Registered Date',
      sortable: true,
      sortField: '',
      name: 'registered.date',
      minWidth: 110,
      cell: ({ item }) => {
        const date = new Date(item.registered.date).toLocaleDateString('id-ID', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
        return <div>{date}</div>;
      },
    },
  ];

  const loadData = async () => {
    try {
      const res = await getUser({ page: 1, results: 10 });
      console.log('res', res);
      const result = res.data.results;
      setRows(result);
    } catch (error) {
      setRows([]);
    }
  };

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <Box>
      <Filter />
      <ReusableTable rows={rows} columns={columns} loading={false} />
    </Box>
  );
};

export default App;
