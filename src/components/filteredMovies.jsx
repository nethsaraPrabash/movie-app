import React, { useState, useEffect } from 'react';
import { fetchFilteredMovies } from '../services/tmdbService';
import MovieGrid from './movieGrid';
import Box from '@mui/material/Box';

const FilteredMovies = ({ filters, onMovieClick }) => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const movies = await fetchFilteredMovies(filters);
        setFilteredMovies(movies);
      } catch (error) {
        console.error('Error fetching filtered movies:', error);
      } finally {
        setLoading(false);
      }
    };

    if (filters) {
      fetchMovies();
    }
  }, [filters]);

  return (
    <Box
      sx={{
        textAlign: 'left',
        margin: '0 auto',
        maxWidth: '1200px',
        padding: '1rem',
      }}
    >
      <h2 style={{ marginBottom: '1rem', marginLeft: '2rem' }}>Filtered Movies</h2>
      {loading ? (
        <p style={{ marginLeft: '2rem' }}>Loading...</p>
      ) : filteredMovies.length > 0 ? (
        <MovieGrid movies={filteredMovies} onMovieClick={onMovieClick} />
      ) : (
        <p style={{ marginLeft: '2rem' }}>No movies found for the selected filters.</p>
      )}
    </Box>
  );
};

export default FilteredMovies;