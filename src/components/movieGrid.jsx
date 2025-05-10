import Grid from '@mui/material/Grid';
import MovieCard from './movieCard';

const MovieGrid = ({ movies, onMovieClick }) => {
  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignItems="center"
      sx={{
        margin: '0 auto',
        width: '100%',
        maxWidth: '1200px',
        padding: '1rem',
      }}
    >
      {movies.map((movie) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={movie.uniqueKey || movie.id}
        >
          <MovieCard movie={movie} onClick={() => onMovieClick(movie.id)} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGrid;