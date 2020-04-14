import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
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

export default function Delivery({ item }) {
  const navigation = useNavigation();

  const getFormattedDate = useCallback(
    date => format(parseISO(date), "dd'/'MM'/'y"),
    []
  );

  return (
    <Container>
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
          <DeliveryProgressText>Aguardando retirada</DeliveryProgressText>
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
          <DeliveryInfoItemValue>{item.recipient.city}</DeliveryInfoItemValue>
        </DeliveryInfoItemContainer>

        <TouchableOpacity
          onPress={() => navigation.navigate('Details', { delivery: item })}
        >
          <MoreDetailsText>Ver detalhes</MoreDetailsText>
        </TouchableOpacity>
      </DeliveryInfo>
    </Container>
  );
}

Delivery.propTypes = {
  item: PropTypes.shape({
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    created_at: PropTypes.string,
    recipient: PropTypes.shape({
      city: PropTypes.string,
    }),
  }).isRequired,
};
