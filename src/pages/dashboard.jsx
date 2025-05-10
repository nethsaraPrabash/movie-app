import React, { useState, useContext } from 'react';
import { Box, Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/searchBar';
import TrendingMovies from '../components/trendingMovies';
import MovieGrid from '../components/movieGrid';
import Filter from '../components/filter';
import FilteredMovies from '../components/filteredMovies';
import { searchMovies } from '../services/tmdbService';
import { ThemeContext } from '../context/themeContextProvider';

const Dashboard = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { themeMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleSearch = async (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    const results = await searchMovies(newQuery, 1);
    setSearchResults(results);
    setFilters(null);
    setHasMore(results.length > 0);
  };

  const loadMoreResults = async () => {
    const nextPage = page + 1;
    const results = await searchMovies(query, nextPage);
    setSearchResults((prevResults) => [...prevResults, ...results]);
    setPage(nextPage);
    setHasMore(results.length > 0);
  };

  const handleApplyFilters = (appliedFilters) => {
    setFilters(appliedFilters);
    setSearchResults([]);
    setHasMore(false);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div
      style={{
        backgroundColor: themeMode === 'dark' ? '#121212' : '#f5f5f5',
        color: themeMode === 'dark' ? '#fff' : '#000',
        minHeight: '100vh',
        padding: '1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
          marginBottom: '1rem',
        }}
      >
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
          }}
        >
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              height: '40px',
              marginRight: '10px',
            }}
          />
          <h1
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '1.8rem',
              color: themeMode === 'dark' ? '#e50914' : '#d32f2f',
              margin: 0,
            }}
          >
            JSPARROW
          </h1>
        </Box>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            alignItems: { xs: 'stretch', sm: 'center' },
            justifyContent: 'flex-end',
            width: '100%',
          }}
        >
          <SearchBar onSearch={handleSearch} />
          <Filter onApplyFilters={handleApplyFilters} />
        </Stack>
      </Box>


      <Box
        sx={{
          textAlign: 'center',
          margin: '0 auto',
          maxWidth: '1200px',
          padding: '1rem',
        }}
      >
        {filters ? (
          <FilteredMovies filters={filters} onMovieClick={(id) => navigate(`/movie/${id}`)} />
        ) : searchResults.length > 0 ? (
          <>
            <MovieGrid movies={searchResults} onMovieClick={(id) => navigate(`/movie/${id}`)} />
            {hasMore && (
              <Button
                variant="contained"
                onClick={loadMoreResults}
                sx={{
                  marginTop: '1rem',
                  backgroundColor: '#e50914',
                  '&:hover': {
                    backgroundColor: '#b20710',
                  },
                }}
              >
                Load More
              </Button>
            )}
          </>
        ) : (
          <TrendingMovies onMovieClick={(id) => navigate(`/movie/${id}`)} />
        )}
      </Box>
    </div>
  );
};

export default Dashboard;