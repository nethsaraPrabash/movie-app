import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { fetchMovieDetails } from '../services/tmdbService';

const MovieDetailsModal = ({ movieId, open, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    if (movieId) {
      const fetchDetails = async () => {
        const details = await fetchMovieDetails(movieId);
        setMovieDetails(details);
      };
      fetchDetails();
    }
  }, [movieId]);

  if (!movieDetails) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{movieDetails.title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{movieDetails.overview}</Typography>
        <Typography variant="body2" color="text.secondary">
          Genres: {movieDetails.genres.map((genre) => genre.name).join(', ')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {movieDetails.vote_average}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Release Date: {movieDetails.release_date}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetailsModal;