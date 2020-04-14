import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'react-native';
import { format, parseISO } from 'date-fns';

import { signOut } from '~/store/modules/auth/actions';

import {
  Container,
  Content,
  Avatar,
  TextProperty,
  TextValue,
  LogoutButton,
  LogoutButtonText,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const accountCreationDateFormatted = useMemo(
    () => format(parseISO(user.created_at), "dd'/'MM'/'y"),
    [user]
  );

  function handleLogout() {
    dispatch(signOut());
  }
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#bbb" />
      <Container>
        <Content>
          <Avatar
            source={{
              uri: user.avatar
                ? user.avatar.url_path
                : `https://api.adorable.io/avatars/150/${user.name}`,
            }}
          />

          <TextProperty>Nome completo</TextProperty>
          <TextValue>{user.name}</TextValue>

          <TextProperty>Email</TextProperty>
          <TextValue>{user.email}</TextValue>

          <TextProperty>Data de cadastro</TextProperty>
          <TextValue>{accountCreationDateFormatted}</TextValue>

          <LogoutButton onPress={handleLogout}>
            <LogoutButtonText>Logout</LogoutButtonText>
          </LogoutButton>
        </Content>
      </Container>
    </>
  );
}
