import React from 'react';
import BrowseLayout from '../../layouts/BrowseLayout';

export default function Family() {
  return (
    <BrowseLayout
      pageTitle="Family Movies"
      endpoint="discover"
      genre="10751"
      icon="fa-solid fa-child-reaching fs-3"
    />
  )
}