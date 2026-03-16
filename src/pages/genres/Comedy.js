import React from 'react';
import BrowseLayout from '../../layouts/BrowseLayout';

export default function Comedy() {
  return (
    <BrowseLayout
      pageTitle="Comedy Movies"
      endpoint="discover"
      genre="35"
      icon="fa-regular fa-face-laugh-beam fs-3"
    />
  )
}

