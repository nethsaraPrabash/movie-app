import React from 'react'
import MovieDetailsModal from '../components/movieDetailsModal';

const movieDetails = () => {

  const movieId = window.location.pathname.split('/').pop();
  return (

    <div>
      <MovieDetailsModal movieId={movieId} open={true} onClose={() => {}} />
    </div>
  )
}

export default movieDetails