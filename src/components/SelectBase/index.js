import { alpha, styled } from '@mui/material/styles';
import MuiSelectBase from '@mui/material/Select';

const SelectBase = styled(MuiSelectBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiSelect-select': {
    width: '100%',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

export default SelectBase;
