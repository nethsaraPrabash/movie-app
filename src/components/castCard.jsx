import { Box, Typography } from '@mui/material';

const CastCard = ({ actor }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '200px', 
        height: '300px', 
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        transition: 'transform 0.3s',
        cursor: 'pointer',
        overflow: 'hidden',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <img
        src={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
            : '/placeholder.png'
        }
        alt={actor.name}
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
      <Typography
        variant="body1"
        sx={{
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: '0.5rem',
          textOverflow: 'ellipsis', 
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {actor.name}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontFamily: 'Roboto, sans-serif',
          color: '#aaa',
          textAlign: 'center',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {actor.character}
      </Typography>
    </Box>
  );
};

export default CastCard;