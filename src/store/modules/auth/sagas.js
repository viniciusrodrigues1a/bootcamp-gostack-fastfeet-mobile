import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { signInSuccess, signInFailure } from './actions';

function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `/deliverymen/${id}`);

    const { id: userId, name, email, avatar, created_at } = response.data;

    yield put(signInSuccess({ id: userId, name, email, avatar, created_at }));
  } catch (err) {
    console.tron.log('here');
    yield put(signInFailure());
    Alert.alert(
      'Falha ao tentar fazer login',
      'Verifique as informações inseridas.'
    );
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
