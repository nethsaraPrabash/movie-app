import { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { Rating } from '@mui/material';
import { motion } from 'framer-motion'; // Import framer-motion for animations

const InformationSet = ({ movieDetails }) => {
  const [isTrailerVisible, setIsTrailerVisible] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  const directors = movieDetails.credits?.crew.filter((member) => member.job === 'Director') || [];
  const writers = movieDetails.credits?.crew.filter((member) => member.job === 'Writer') || [];
  const producers = movieDetails.credits?.crew.filter((member) => member.job === 'Producer') || [];

  useEffect(() => {
    if (movieDetails.videos && movieDetails.videos.results) {
      const trailer = movieDetails.videos.results.find(
        (video) => video.type === 'Trailer' && video.site === 'YouTube'
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      }
    }
  }, [movieDetails]);

  const handleToggleTrailer = () => {
    setIsTrailerVisible((prev) => !prev);
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(25, 25, 25, 0.6))',
        padding: '2rem',
        borderRadius: '10px',
        color: '#fff',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.7)',
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Grid
          container
          spacing={4}
          sx={{
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {/* Title and Details */}
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontWeight: 'bold',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#e50914',
                fontSize: {
                  xs: '2rem',
                  sm: '2.5rem',
                  md: '3rem',
                },
              }}
            >
              {movieDetails.title}
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 'bold',
                marginTop: '0.5rem',
              }}
            >
              <strong>Runtime:</strong> {movieDetails.runtime} minutes
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 'bold',
                marginTop: '0.5rem',
              }}
            >
              <strong>Genres:</strong> {movieDetails.genres.map((genre) => genre.name).join(', ')}
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 'bold',
                marginTop: '0.5rem',
              }}
            >
              <strong>Release Date:</strong> {movieDetails.release_date}
            </Typography>
          </Grid>

          {/* Rating */}
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card
                sx={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '1rem',
                  borderRadius: '10px',
                  textAlign: 'center',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                  width: '100%',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    color: '#fff',
                  }}
                >
                  <strong>Rating:</strong>
                </Typography>
                <Rating
                  value={movieDetails.vote_average / 2}
                  precision={0.5}
                  readOnly
                  sx={{
                    color: '#e50914',
                    fontSize: {
                      xs: '1.5rem', // Smaller font size for mobile devices
                      sm: '2rem',   // Default font size for larger screens
                    },
                    marginTop: '0.5rem',
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 'bold',
                    fontSize: {
                      xs: '0.9rem', // Smaller font size for mobile devices
                      sm: '1rem',   // Default font size for larger screens
                    },
                    color: '#fff',
                    marginTop: '0.5rem',
                  }}
                >
                  ({movieDetails.vote_average} / 10)
                </Typography>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Overview */}
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            fontFamily: 'Roboto, sans-serif',
            lineHeight: '1.8',
            fontSize: '1.1rem',
            marginTop: '2rem',
          }}
        >
          {movieDetails.overview}
        </Typography>

        {/* Directors, Writers, Producers */}
        <Box
          sx={{
            marginTop: '2rem',
          }}
        >
          {directors.length > 0 && (
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 'bold',
              }}
            >
              <strong>Directors:</strong> {directors.map((director) => director.name).join(', ')}
            </Typography>
          )}
          {writers.length > 0 && (
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 'bold',
              }}
            >
              <strong>Writers:</strong> {writers.map((writer) => writer.name).join(', ')}
            </Typography>
          )}
          {producers.length > 0 && (
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 'bold',
              }}
            >
              <strong>Producers:</strong> {producers.map((producer) => producer.name).join(', ')}
            </Typography>
          )}
        </Box>

        {/* Buttons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: '1rem',
            marginTop: '2rem',
          }}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                backgroundColor: '#e50914',
                '&:hover': {
                  backgroundColor: '#b20710',
                },
              }}
              onClick={handleToggleTrailer}
              disabled={!trailerKey}
            >
              {isTrailerVisible ? 'Hide Trailer' : 'Watch Trailer'}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                borderColor: '#e50914',
                color: '#e50914',
                '&:hover': {
                  borderColor: '#b20710',
                  color: '#b20710',
                },
              }}
            >
              Add to Watchlist
            </Button>
          </motion.div>
        </Box>

        {/* Trailer */}
        {isTrailerVisible && trailerKey && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                marginTop: '2rem',
                width: '100%',
                maxWidth: '800px',
                aspectRatio: '16/9',
                backgroundColor: '#000',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
              }}
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Box>
          </motion.div>
        )}
      </motion.div>
    </Box>
  );
};

export default InformationSet;