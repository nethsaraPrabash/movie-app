import { useState } from 'react';
import { Box, Select, MenuItem, Slider, Typography, Button, IconButton, Drawer } from '@mui/material';
import { FilterList } from '@mui/icons-material';

const Filter = ({ onApplyFilters }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState([0, 10]);

  const toggleFilterDrawer = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleApplyFilters = () => {
    onApplyFilters({ genre, year, rating });
    setIsFilterOpen(false);
    console.log('Applied Filters:', { genre, year, rating });
  };

  return (
    <>
      {/* Filter Icon */}
      <IconButton
        onClick={toggleFilterDrawer}
        sx={{
          color: '#fff',
          backgroundColor: '#e50914',
          borderRadius: '50%',
          width: { xs: '40px', sm: 'auto' },
          height: { xs: '40px', sm: 'auto' },
          '&:hover': {
            backgroundColor: '#b20710',
          },
        }}
      >
        <FilterList />
      </IconButton>

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={isFilterOpen}
        onClose={toggleFilterDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: '80%',
            padding: '1rem',
          },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {/* Genre Filter */}
          <Box>
            <Typography variant="body1" gutterBottom>
              Genre
            </Typography>
            <Select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              displayEmpty
              sx={{
                width: '100%',
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="28">Action</MenuItem>
              <MenuItem value="35">Comedy</MenuItem>
              <MenuItem value="18">Drama</MenuItem>
              <MenuItem value="27">Horror</MenuItem>
              <MenuItem value="878">Sci-Fi</MenuItem>
            </Select>
          </Box>

          {/* Year Filter */}
          <Box>
            <Typography variant="body1" gutterBottom>
              Year
            </Typography>
            <Select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              displayEmpty
              sx={{
                width: '100%',
              }}
            >
              <MenuItem value="">All</MenuItem>
              {Array.from({ length: 20 }, (_, i) => (
                <MenuItem key={i} value={2025 - i}>
                  {2025 - i}
                </MenuItem>
              ))}
            </Select>
          </Box>

          {/* Rating Filter */}
          <Box>
            <Typography variant="body1" gutterBottom>
              Rating
            </Typography>
            <Slider
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={10}
            />
          </Box>

          {/* Apply Filters Button */}
          <Button
            variant="contained"
            onClick={handleApplyFilters}
            sx={{
              backgroundColor: '#e50914',
              '&:hover': {
                backgroundColor: '#b20710',
              },
            }}
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Filter;