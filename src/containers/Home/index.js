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

const App = () => {
  const inputRef = React.useRef(null);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [keyword, setKeyword] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [gender, setGender] = React.useState('all');

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
      const params = {
        page,
        results: pageSize,
        pageSize,
        keyword: keyword !== '' ? keyword : undefined,
        gender: gender !== 'all' ? gender : undefined,
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

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleSearchDebounce = debounceEvent((query) => {
    setKeyword(query);
    setPage(1);
  }, 1000);

  const handleSearch = (e) => {
    const { value } = e.target;
    handleSearchDebounce(value);
  };

  const handleFilterGender = (e) => {
    setGender(e.target.value);
    setPage(1);
  };

  const handleReset = () => {
    setGender('all');
    setPage(1);
    setPageSize(5);
    setKeyword();
    inputRef.current.value = '';
  };

  React.useEffect(() => {
    loadData();
  }, [page, pageSize, keyword, gender]);

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
              value={gender}
              onChange={handleFilterGender}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </SelectBase>
          </FormControl>
        </Grid>
        <Grid item md={3} sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Button variant="outlined" size="large" type="button" onClick={handleReset}>
            Reset
          </Button>
        </Grid>
      </Grid>
      <ReusableTable rows={rows} columns={columns} loading={loading} />
      <TablePagination
        component="div"
        count={MOCK_TOTAL}
        page={page - 1}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      />
    </Box>
  );
};

export default App;
