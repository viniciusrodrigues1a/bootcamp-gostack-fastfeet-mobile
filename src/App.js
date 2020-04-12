import React from 'react';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';

import Routes from '~/routes';

export default function App() {
  const signedIn = useSelector(state => state.auth.signed);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Routes signedIn={signedIn} />
    </>
  );
}
