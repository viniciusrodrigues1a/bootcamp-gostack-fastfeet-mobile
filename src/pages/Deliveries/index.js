import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar, View, TouchableOpacity } from 'react-native';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import { signOut } from '~/store/modules/auth/actions';

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
  Delivery,
  DeliveryContent,
  DeliveryTitle,
  DeliveryTitleText,
  DeliveryProgressContainer,
  DeliveryProgressBullet,
  DeliveryProgressText,
  DeliveryProgressTextContainer,
  DeliveryInfo,
  DeliveryInfoItemContainer,
  DeliveryInfoItemProperty,
  DeliveryInfoItemValue,
  MoreDetailsText,
} from './styles';

export default function Deliveries({ navigation }) {
  const [deliveries, setDeliveries] = useState([]);
  const [filter, setFilter] = useState('pending');
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    async function loadDeliveries() {
      const response = await api.get(`deliverymen/${user.id}/deliveries`);

      setDeliveries(response.data);
    }

    loadDeliveries();
  }, [user.id]);

  function handleLogout() {
    dispatch(signOut());
  }

  const getFormattedDate = useCallback(
    date => format(parseISO(date), "dd'/'MM'/'y"),
    []
  );

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
      <StatusBar barStyle="light-content" backgroundColor="#fff" />
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

        <DeliveriesList
          data={getFilteredDeliveries}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Delivery>
              {console.tron.log(item)}
              <DeliveryContent>
                <DeliveryTitle>
                  <Icon name="local-shipping" color="#7D40E7" size={20} />
                  <DeliveryTitleText>Encomenda {item.id}</DeliveryTitleText>
                </DeliveryTitle>
                <DeliveryProgressContainer>
                  <DeliveryProgressBullet filled />
                  <DeliveryProgressBullet filled={Boolean(item.start_date)} />
                  <DeliveryProgressBullet filled={Boolean(item.end_date)} />
                </DeliveryProgressContainer>

                <DeliveryProgressTextContainer>
                  <DeliveryProgressText>
                    Aguardando retirada
                  </DeliveryProgressText>
                  <DeliveryProgressText style={{ textAlign: 'center' }}>
                    Retirada
                  </DeliveryProgressText>
                  <DeliveryProgressText style={{ textAlign: 'right' }}>
                    Entregue
                  </DeliveryProgressText>
                </DeliveryProgressTextContainer>
              </DeliveryContent>
              <DeliveryInfo>
                <DeliveryInfoItemContainer>
                  <DeliveryInfoItemProperty>Data</DeliveryInfoItemProperty>
                  <DeliveryInfoItemValue>
                    {getFormattedDate(item.created_at)}
                  </DeliveryInfoItemValue>
                </DeliveryInfoItemContainer>

                <DeliveryInfoItemContainer>
                  <DeliveryInfoItemProperty>Cidade</DeliveryInfoItemProperty>
                  <DeliveryInfoItemValue>
                    {item.recipient.city}
                  </DeliveryInfoItemValue>
                </DeliveryInfoItemContainer>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Details')}
                >
                  <MoreDetailsText>Ver detalhes</MoreDetailsText>
                </TouchableOpacity>
              </DeliveryInfo>
            </Delivery>
          )}
        />
      </Container>
    </>
  );
}
