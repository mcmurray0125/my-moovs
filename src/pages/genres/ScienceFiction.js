import React from 'react';
import BrowseLayout from '../../layouts/BrowseLayout';

export default function ScienceFiction() {
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&with_genres=878&with_watch_monetization_types=flatrate`;

  return (
    <BrowseLayout
      pageTitle="Sci-Fi Movies"
      apiUrl={apiUrl}
      icon="fa-solid fa-flask fs-3"
    />
  )
}