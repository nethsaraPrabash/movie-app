import React from 'react';
import { Box, Typography } from '@mui/material';

const CastCard = ({ actor }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between', // Ensures content is spaced evenly
        width: '200px', // Fixed width for the card
        height: '300px', // Fixed height for the card
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        transition: 'transform 0.3s',
        cursor: 'pointer',
        overflow: 'hidden', // Prevent content overflow
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
          textOverflow: 'ellipsis', // Truncate long text
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
          textOverflow: 'ellipsis', // Truncate long text
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