import React from 'react';
import { useSelector } from 'react-redux';

import Routes from '~/routes';

export default function App() {
  const signedIn = useSelector(state => state.auth.signed);

  return <Routes signedIn={signedIn} />;
}
