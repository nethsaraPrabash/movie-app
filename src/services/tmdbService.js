import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  return response.data.results;
};

export const searchMovies = async (query, page = 1) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
  );
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits`);
  return response.data;
};

export const fetchMovieCredits = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
  return response.data;
};

export const fetchMovieImages = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/images?api_key=${API_KEY}`);
  return response.data;
};


export const fetchFilteredMovies = async ({ genre, year, rating }, page = 1) => {
  const params = {
    api_key: API_KEY,
    page,
    with_genres: genre || undefined, // Filter by genre if provided
    primary_release_year: year || undefined, // Filter by release year if provided
    'vote_average.gte': rating ? rating[0] : undefined, // Minimum rating
    'vote_average.lte': rating ? rating[1] : undefined, // Maximum rating
  };

  const response = await axios.get(`${BASE_URL}/discover/movie`, { params });
  return response.data.results;
};




