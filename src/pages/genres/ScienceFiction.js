import React from 'react';
import BrowseLayout from '../../layouts/BrowseLayout';

export default function ScienceFiction() {
  return (
    <BrowseLayout
      pageTitle="Sci-Fi Movies"
      endpoint="discover"
      genre="878"
      icon="fa-solid fa-flask fs-3"
    />
  )
}