import React from 'react';
import BrowseLayout from '../../layouts/BrowseLayout';

export default function Drama() {
  return (
    <BrowseLayout
      pageTitle="Drama Movies"
      endpoint="discover"
      genre="18"
      icon="fa-solid fa-masks-theater fs-3"
    />
  )
}

