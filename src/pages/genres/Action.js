import React from 'react';
import BrowseLayout from '../../layouts/BrowseLayout';

export default function Action() {
  return (
      <BrowseLayout
        pageTitle="Action Movies"
        endpoint="discover"
        genre="28"
        icon="fa-solid fa-burst fs-3"
      />
  )
}
