import React from 'react';
import BrowseLayout from '../../layouts/BrowseLayout';

export default function Comedy() {
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&with_genres=35&with_watch_monetization_types=flatrate`;

  return (
    <BrowseLayout
      pageTitle="Comedy Movies"
      apiUrl={apiUrl}
      icon="fa-regular fa-face-laugh-beam fs-3"
    />
  )
}

