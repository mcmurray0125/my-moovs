import React from 'react';
import BrowseLayout from '../layouts/BrowseLayout';

export default function PopularMovies() {
  return (
    <BrowseLayout
      pageTitle="Popular Movies"
      endpoint="popular"
      icon={null}
    />
  )
}

