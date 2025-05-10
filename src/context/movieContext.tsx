import { createContext, useState } from 'react';

export const MovieContext = createContext({
    trendingMovies: [],
    setTrendingMovies: (movies) => {},
    searchResults: [],
    setSearchResults: (results) => {},
    favorites: [],
    setFavorites: (favorites) => {},
});

const MovieProvider = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  return (
    <MovieContext.Provider value={{ trendingMovies, setTrendingMovies, searchResults, setSearchResults, favorites, setFavorites }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;