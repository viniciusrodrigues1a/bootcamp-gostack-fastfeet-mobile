import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import { signOut } from '~/store/modules/auth/actions';

import Delivery from './Delivery';
import LoadingIcon from '~/components/LoadingIcon';

import {
  Container,
  DeliverymanInfoContainer,
  DeliverymanImage,
  WelcomeContainer,
  WelcomeText,
  DeliverymanName,
  FilterDeliveriesContainer,
  DeliveriesText,
  FilterOptionContainer,
  FilterOptionText,
  DeliveriesList,
} from './styles';

export default function Deliveries({ navigation }) {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('pending');
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    async function loadDeliveries() {
      setLoading(true);

      const response = await api.get(`deliverymen/${user.id}/deliveries`);

      setDeliveries(response.data);
      setLoading(false);
    }

    loadDeliveries();
  }, [user.id]);

  function handleLogout() {
    dispatch(signOut());
  }

  const getFilteredDeliveries = useMemo(() => {
    if (filter === 'pending') {
      return deliveries.filter(d => !d.end_date);
    }
    if (filter === 'delivered') {
      return deliveries.filter(d => d.end_date);
    }
  }, [filter, deliveries]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#bbb" />
      <Container>
        <DeliverymanInfoContainer>
          <View style={{ flexDirection: 'row' }}>
            <DeliverymanImage
              source={{
                uri: user.avatar
                  ? user.avatar.url_path
                  : `https://api.adorable.io/avatars/50/${user.name}`,
              }}
            />

            <WelcomeContainer>
              <WelcomeText>Bem vindo de volta,</WelcomeText>
              <DeliverymanName>{user.name}</DeliverymanName>
            </WelcomeContainer>
          </View>

          <Icon
            name="exit-to-app"
            color="#E74040"
            size={30}
            onPress={handleLogout}
          />
        </DeliverymanInfoContainer>

        <FilterDeliveriesContainer>
          <DeliveriesText>Entregas</DeliveriesText>

          <FilterOptionContainer>
            <TouchableOpacity onPress={() => setFilter('pending')}>
              <FilterOptionText selected={filter === 'pending'}>
                Pendentes
              </FilterOptionText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setFilter('delivered')}>
              <FilterOptionText
                selected={filter === 'delivered'}
                style={{ marginLeft: 20 }}
              >
                Entregues
              </FilterOptionText>
            </TouchableOpacity>
          </FilterOptionContainer>
        </FilterDeliveriesContainer>

        {loading ? (
          <LoadingIcon />
        ) : (
          <DeliveriesList
            data={getFilteredDeliveries}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <Delivery item={item} />}
          />
        )}
      </Container>
    </>
  );
}
