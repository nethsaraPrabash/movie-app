import React, { useState, useContext, useEffect, useRef } from 'react';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import SearchBar from '../components/searchBar';
import TrendingMovies from '../components/trendingMovies';
import MovieGrid from '../components/movieGrid';
import MovieDetailsModal from '../components/movieDetailsModal';
import { searchMovies } from '../services/tmdbService';
import { ThemeContext } from '../context/themeContextProvider';
import Box from '@mui/material/Box';

const Dashboard = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { themeMode } = useContext(ThemeContext);
  const observerRef = useRef();
  const navigate = useNavigate(); // Initialize navigate

  const isLargeScreen = useMediaQuery('(min-width:600px)');

  const handleSearch = async (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    if (newQuery) {
      const results = await searchMovies(newQuery, 1);
      setSearchResults(results);
      setHasMore(results.length > 0);
    } else {
      setSearchResults([]);
      setHasMore(false);
    }
  };

  const fetchMoreResults = async () => {
    if (query && hasMore) {
      setSearchResults((prevResults) => {
        const newResults = prevResults.map((movie, index) => ({
          ...movie,
          uniqueKey: `${movie.id}-${index}-${Date.now()}`,
        }));
        return [...prevResults, ...newResults];
      });
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`); // Navigate to the MovieDetails page
  };

  const handleCloseModal = () => {
    setSelectedMovieId(null);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMoreResults();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [observerRef, hasMore, query, page]);

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
        {isLargeScreen && ( // Show logo only on larger screens
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                fontFamily: 'Bebas Neue, sans-serif', // Netflix-like font
                fontSize: '1.8rem',
                color: themeMode === 'dark' ? '#e50914' : '#d32f2f', // Netflix red
                margin: 0,
              }}
            >
              JSPARROW
            </h1>
          </Box>
        )}

        <SearchBar onSearch={handleSearch} />
      </Box>

      <Box
        sx={{
          textAlign: 'center', // Center the heading
          margin: '0 auto', // Center the container
          maxWidth: '1200px', // Limit the width for better structure
          padding: '1rem', // Add padding around the container
        }}
      >
        {searchResults.length > 0 ? (
          <>
            <h2 style={{ marginBottom: '1rem' }}>Search Results</h2>
            <MovieGrid movies={searchResults} onMovieClick={handleMovieClick} />
            <div ref={observerRef} style={{ height: '50px', marginTop: '1rem' }} />
          </>
        ) : (
          <>
            <TrendingMovies onMovieClick={handleMovieClick} />
          </>
        )}
      </Box>
    </div>
  );
};

export default Dashboard;