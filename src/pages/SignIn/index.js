import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Image } from 'react-native';

import { signInRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/images/logo.png';

import { Container, Input, SubmitButton, SubmitButtonText } from './styles';

export default function SignIn() {
  const [userId, setUserId] = useState('');

  const dispatch = useDispatch();

  function handleLogin() {
    dispatch(signInRequest(userId));
  }

  return (
    <Container>
      <Image source={logo} />
      <Input
        name="userId"
        placeholder="Informe seu ID de cadastro"
        returnKeyType="send"
        keyboardType="numeric"
        value={userId}
        onChangeText={setUserId}
        onSubmitEditing={handleLogin}
      />
      <SubmitButton>
        <SubmitButtonText onPress={handleLogin}>
          Entrar no sistema
        </SubmitButtonText>
      </SubmitButton>
    </Container>
  );
}
