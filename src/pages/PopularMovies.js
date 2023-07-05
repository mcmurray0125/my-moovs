import React from 'react';
import BrowseLayout from '../layouts/BrowseLayout';

export default function PopularMovies() {
  const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`;

  return (
    <BrowseLayout
      pageTitle="Popular Movies"
      apiUrl={apiUrl}
      icon={null}
    />
  )
}

