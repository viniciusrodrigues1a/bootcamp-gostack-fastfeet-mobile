import React, { useState } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';

import api from '~/services/api';

import ColoredContainer from '~/components/ColoredContainer';

import { Input, SendButton, SendButtonText } from './styles';

export default function NewProblem({ route }) {
  const [problem, setProblem] = useState('');

  const { id } = route.params;

  async function createProblem() {
    if (problem !== '') {
      try {
        await api.post('/problems', {
          description: problem,
          delivery_id: id,
        });

        setProblem('');

        Alert.alert('Problema registrado com sucesso!');
      } catch (err) {
        Alert.alert('Algo deu errado!');
      }
    }
  }

  return (
    <ColoredContainer.Container>
      <ColoredContainer.ContentWrapper>
        <ColoredContainer.Content>
          <Input
            placeholder="Inclua aqui o problema que ocorreu na entrega."
            textAlignVertical="top"
            multiline
            value={problem}
            onChangeText={setProblem}
          />
        </ColoredContainer.Content>
        <SendButton onPress={createProblem}>
          <SendButtonText>Enviar</SendButtonText>
        </SendButton>
      </ColoredContainer.ContentWrapper>
    </ColoredContainer.Container>
  );
}

NewProblem.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};
