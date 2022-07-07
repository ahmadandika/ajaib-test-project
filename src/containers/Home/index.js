import React from 'react';
import ReusableTable from 'components/ReusableTable';
import { getUser } from 'services';
import { Box, TablePagination } from '@mui/material';
import Filter from './components/Filter';

const MOCK_TOTAL = 100;

const App = () => {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

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
    setLoading(true);
    try {
      const res = await getUser({ page, results: pageSize, pageSize });
      const result = res.data.results;
      setRows(result);
    } catch (error) {
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    loadData();
  }, [page, pageSize]);

  return (
    <Box>
      <Filter />
      <ReusableTable rows={rows} columns={columns} loading={loading} />
      <TablePagination
        component="div"
        count={MOCK_TOTAL}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      />
    </Box>
  );
};

export default App;
