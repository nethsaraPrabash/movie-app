import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { fetchMovieDetails, fetchMovieImages, fetchMovieCredits } from '../services/tmdbService';
import CastCard from './castCard';
import InformationSet from './informationSet';

const MovieDetailsModal = ({ movieId }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieImages, setMovieImages] = useState([]);
  const [movieCast, setMovieCast] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    if (movieId) {
      const fetchDetails = async () => {
        const details = await fetchMovieDetails(movieId);
        const images = await fetchMovieImages(movieId);
        const credits = await fetchMovieCredits(movieId);

        setMovieDetails(details);
        setMovieImages(images.backdrops || []);
        setMovieCast(credits.cast || []);
      };
      fetchDetails();
    }
  }, [movieId]);

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === movieImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? movieImages.length - 1 : prevIndex - 1
    );
  };

  if (!movieDetails) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#121212',
          color: '#fff',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >

      <Box
        sx={{
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '2rem',
          marginTop: 'auto',
        }}
      >
        <InformationSet movieDetails={movieDetails} />

        <Box sx={{ marginTop: '2rem' }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontWeight: 'bold',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              textAlign: { xs: 'left', sm: 'center', md: 'center' },
              display: 'block',
            }}
          >
            Photos
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{
              justifyContent: { xs: 'flex-start', sm: 'center', md: 'center' },
              alignItems: { xs: 'flex-start', sm: 'center', md: 'center' },
            }}
          >
            {movieImages.slice(0, 6).map((image, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  alt={`Movie Scene ${index + 1}`}
                  style={{
                    width: '100%',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'transform 0.3s',
                  }}
                  onClick={() => setSelectedImageIndex(index)}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Modal
          open={selectedImageIndex !== null}
          onClose={() => setSelectedImageIndex(null)} // Close the modal when clicking outside
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              position: 'relative',
            }}
          >
            <IconButton
              onClick={() => setSelectedImageIndex(null)} 
              sx={{
                position: 'absolute',
                top: '2%',
                right: '2%',
                color: '#fff',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                },
              }}
            >
              <CloseIcon />
            </IconButton>

            <IconButton
              onClick={handlePrevImage}
              sx={{
                position: 'absolute',
                left: '2%',
                color: '#fff',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                },
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>


            <img
              src={`https://image.tmdb.org/t/p/original${movieImages[selectedImageIndex]?.file_path}`}
              alt="Full Screen"
              style={{
                maxWidth: '90%',
                maxHeight: '90%',
                borderRadius: '10px',
              }}
            />

            <IconButton
              onClick={handleNextImage}
              sx={{
                position: 'absolute',
                right: '2%',
                color: '#fff',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                },
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Modal>

        <Box sx={{ marginTop: '2rem' }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontWeight: 'bold',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              textAlign: { xs: 'left', sm: 'center', md: 'center' },
              display: 'block',

            }}
          >
            Cast
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{
              justifyContent: { xs: 'center', sm: 'center', md: 'center' },
              alignItems: { xs: 'center', sm: 'center', md: 'center' },
            }}
          >
            {movieCast.slice(0, 6).map((actor, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <CastCard actor={actor} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieDetailsModal;