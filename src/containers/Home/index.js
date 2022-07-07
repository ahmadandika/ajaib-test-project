import React from 'react';
import ReusableTable from 'components/ReusableTable';
import { getUser } from 'services';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  TablePagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from 'components/InputBase';
import SelectBase from 'components/SelectBase';
import { debounceEvent } from 'helpers/debounce';

const MOCK_TOTAL = 100;

const Home = () => {
  const inputRef = React.useRef(null);
  const tableRef = React.useRef();
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [keyword, setKeyword] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [gender, setGender] = React.useState('all');

  const [sortOrder, setSortOrder] = React.useState();
  const [sortBy, setSortBy] = React.useState();

  const columns = [
    {
      label: 'Username',
      name: 'login.username',
      minWidth: 110,
    },
    {
      label: 'Name',
      sort: true,
      name: 'name',
      minWidth: 110,
      cell: ({ item }) => {
        return <div>{`${item.name.first} ${item.name.last}`}</div>;
      },
    },
    {
      label: 'Email',
      sort: true,
      name: 'email',
      minWidth: 110,
    },
    {
      label: 'Gender',
      sort: true,
      name: 'gender',
      minWidth: 110,
    },
    {
      label: 'Registered Date',
      sort: true,
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
      const params = {
        page,
        results: pageSize,
        pageSize,
        keyword: keyword !== '' ? keyword : undefined,
        gender: gender !== 'all' ? gender : undefined,
        sortBy: sortBy !== '' ? sortBy : undefined,
        sortOrder: sortBy ? (sortOrder !== '' ? sortOrder : undefined) : undefined,
      };
      const res = await getUser(params);
      const result = res.data.results;
      setRows(result);
    } catch (error) {
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage + 1);
  };

  const resetSort = () => {
    setSortOrder();
    setSortBy();
    tableRef.current?.reset();
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 5));
    setPage(1);
    resetSort();
  };

  const handleSearchDebounce = debounceEvent((query) => {
    setKeyword(query);
    setPage(1);
    resetSort();
  }, 1000);

  const handleSearch = (e) => {
    const { value } = e.target;
    handleSearchDebounce(value);
  };

  const handleFilterGender = (e) => {
    setGender(e.target.value);
    setPage(1);
    resetSort();
  };

  const handleReset = () => {
    setGender('all');
    setPage(1);
    setPageSize(5);
    setKeyword();
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    resetSort();
  };

  const handleSort = (order, orderBy) => {
    setSortOrder(order);
    setSortBy(orderBy);
  };

  React.useEffect(() => {
    loadData();
  }, [page, pageSize, keyword, gender, sortOrder, sortBy]);

  return (
    <Box>
      <Grid container spacing={3} mb={2}>
        <Grid item md={3}>
          <FormControl fullWidth variant="standard">
            <InputLabel shrink htmlFor="input-search">
              Search
            </InputLabel>
            <InputBase
              inputRef={inputRef}
              id="input-search"
              type="text"
              placeholder="Search ..."
              data-testid="search-input"
              onChange={handleSearch}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="search visibility" edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item md={3}>
          <FormControl fullWidth variant="standard">
            <InputLabel shrink id="gender">
              Gender
            </InputLabel>
            <SelectBase
              defaultValue="all"
              labelId="gender-select-label"
              id="gender-select"
              data-testid="filter-gender"
              value={gender}
              onChange={handleFilterGender}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </SelectBase>
          </FormControl>
        </Grid>
        <Grid item md={3} sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Button
            variant="outlined"
            size="large"
            type="button"
            onClick={handleReset}
            data-testid="reset-btn">
            Reset
          </Button>
        </Grid>
      </Grid>
      <ReusableTable
        ref={tableRef}
        rows={rows}
        columns={columns}
        loading={loading}
        onSorting={handleSort}
        data-testid="table"
      />
      {rows.length > 0 ? (
        <TablePagination
          data-testid="table-pagination"
          component="div"
          count={MOCK_TOTAL}
          page={page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={pageSize}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 15]}
        />
      ) : (
        ''
      )}
    </Box>
  );
};

export default Home;
