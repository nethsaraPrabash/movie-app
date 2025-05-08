import React, { useState, useContext } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from '../utils/debounce';
import { ThemeContext } from '../context/themeContextProvider';


const SearchContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'themeMode', 
})(({ theme, themeMode }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(themeMode === 'dark' ? '#fff' : '#000', 0.15),
  '&:hover': {
    backgroundColor: alpha(themeMode === 'dark' ? '#fff' : '#000', 0.25),
  },
  marginLeft: 'auto', 
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '300px',
  },
}));

const StyledInputBase = styled(InputBase, {
  shouldForwardProp: (prop) => prop !== 'themeMode',
})(({ theme, themeMode }) => ({
  color: themeMode === 'dark' ? '#fff' : '#000',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '100%', 
    },
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const { themeMode } = useContext(ThemeContext);

  const handleSearch = debounce((value) => {
    onSearch(value);
  }, 500);

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    handleSearch(value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '1rem',
      }}
    >
      <SearchContainer themeMode={themeMode}>
        <SearchIconWrapper>
          <SearchIcon sx={{ color: themeMode === 'dark' ? '#fff' : '#000' }} />
        </SearchIconWrapper>
        <StyledInputBase
          themeMode={themeMode}
          placeholder="Search Movies…"
          inputProps={{ 'aria-label': 'search' }}
          value={query}
          onChange={handleChange}
        />
      </SearchContainer>
    </Box>
  );
};

export default SearchBar;