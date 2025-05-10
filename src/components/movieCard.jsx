import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

const MovieCard = ({ movie, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.3s, box-shadow 0.3s',
        width: '250px',
        height: '450px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        sx={{
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            transition: 'color 0.3s',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap', // Prevents wrapping of long titles
            '&:hover': {
              color: '#1976d2',
            },
          }}
        >
          {movie.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{
            transition: 'color 0.3s',
            '&:hover': {
              color: '#1976d2',
            },
          }}
        >
          Release Year: {new Date(movie.release_date).getFullYear()}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Rating
            name="movie-rating"
            value={movie.vote_average / 2} // Convert rating to a 5-star scale
            precision={0.5}
            readOnly
            size="small"
            sx={{
              transition: 'transform 0.3s',
            }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              transition: 'color 0.3s',
              '&:hover': {
                color: '#1976d2',
                transform: 'scale(1.2)',
              },
            }}
          >
            {movie.vote_average.toFixed(1)} / 10
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;