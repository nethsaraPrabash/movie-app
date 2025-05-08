import React, { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../services/tmdbService';
import MovieGrid from './movieGrid';
import Box from '@mui/material/Box';

const TrendingMovies = ({ onMovieClick }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await fetchTrendingMovies();
      setTrendingMovies(movies);
    };
    fetchMovies();
  }, []);

  return (
    <Box
      sx={{
        textAlign: 'left',
        margin: '0 auto',
        maxWidth: '1200px',
        padding: '1rem',
      }}
    >
      <h2 style={{ marginBottom: '1rem', marginLeft: '2rem' }}>Trending Movies</h2>
      <MovieGrid movies={trendingMovies} onMovieClick={onMovieClick} />
    </Box>
  );
};

export default TrendingMovies;