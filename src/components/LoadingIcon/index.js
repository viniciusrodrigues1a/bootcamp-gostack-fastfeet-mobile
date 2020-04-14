import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Container } from './styles';

export default function LoadingIcon() {
  return (
    <Container>
      <ActivityIndicator />
    </Container>
  );
}
