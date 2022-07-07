import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import InputBase from 'components/InputBase';
import SelectBase from 'components/SelectBase';

const Filter = () => {
  const [gender, setGender] = React.useState('all');

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleSearch = () => {};

  const handleReset = () => {};

  return (
    <Grid container spacing={3} mb={2}>
      <Grid item md={3}>
        <FormControl fullWidth variant="standard">
          <InputLabel shrink htmlFor="input-search">
            Search
          </InputLabel>
          <InputBase
            id="input-search"
            type="text"
            onChange={handleSearch}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" edge="end">
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
            onChange={handleChangeGender}>
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
  );
};

export default Filter;
