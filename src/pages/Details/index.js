import React, { useMemo } from 'react';
import { StatusBar, View } from 'react-native';
import { parseISO, format } from 'date-fns';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Title,
  TitleText,
  Property,
  Value,
  FlexContainer,
  ActionsContainer,
  Action,
  ActionText,
} from './styles';

import ColoredContainer from '~/components/ColoredContainer';

export default function Details({ route, navigation }) {
  const { delivery } = route.params;

  const deliveryStatus = useMemo(() => {
    if (delivery.canceled_at) {
      return 'Cancelada';
    }
    if (delivery.end_date) {
      return 'Entregue';
    }
    if (delivery.start_date) {
      return 'Retirada';
    }
    return 'Pendente';
  }, [delivery]);

  const withdrawDateFormatted = useMemo(
    () =>
      delivery.start_date
        ? format(parseISO(delivery.start_date), "dd '/' MM '/' y")
        : '--/--/--',
    [delivery]
  );

  const deliveredDateFormatted = useMemo(
    () =>
      delivery.end_date
        ? format(parseISO(delivery.end_date), "dd '/' MM '/' y")
        : '--/--/--',
    [delivery]
  );

  const canExecuteAnAction = useMemo(() => Boolean(delivery.start_date), []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <ColoredContainer.Container>
        <ColoredContainer.ContentWrapper>
          <ColoredContainer.Content>
            <Title>
              <Icon name="local-shipping" color="#7D40E7" size={20} />
              <TitleText>Informações da entrega</TitleText>
            </Title>

            <Property>Destinatário</Property>
            <Value>{delivery.recipient.name}</Value>

            <Property>Endereço de entrega</Property>
            <Value>
              {delivery.recipient.street}, {delivery.recipient.house_number},{' '}
              {delivery.recipient.city} - {delivery.recipient.state},{' '}
              {delivery.recipient.cep_code}
            </Value>

            <Property>Produto</Property>
            <Value>{delivery.product}</Value>
          </ColoredContainer.Content>

          <ColoredContainer.Content>
            <Title>
              <Icon name="event" color="#7D40E7" size={20} />
              <TitleText>Situação da entrega</TitleText>
            </Title>

            <Property>Status</Property>
            <Value>{deliveryStatus}</Value>

            <FlexContainer>
              <View>
                <Property>Data de retirada</Property>
                <Value>{withdrawDateFormatted}</Value>
              </View>

              <View>
                <Property>Data de entrega</Property>
                <Value>{deliveredDateFormatted}</Value>
              </View>
            </FlexContainer>
          </ColoredContainer.Content>

          <ColoredContainer.Content
            style={{
              paddingTop: 0,
              paddingBottom: 0,
              paddingRight: 0,
              paddingLeft: 0,
            }}
          >
            <ActionsContainer>
              <Action
                onPress={
                  canExecuteAnAction
                    ? () =>
                        navigation.navigate('NewProblem', { id: delivery.id })
                    : () => {}
                }
              >
                <Icon
                  name="cancel"
                  size={40}
                  color={canExecuteAnAction ? '#E74040' : '#aaa'}
                />
                <ActionText>Informar problema</ActionText>
              </Action>
              <Action
                style={{
                  borderRightWidth: 1,
                  borderLeftWidth: 1,
                  borderColor: '#aaa',
                }}
                onPress={
                  canExecuteAnAction
                    ? () => navigation.navigate('Problems', { id: delivery.id })
                    : () => {}
                }
              >
                <Icon
                  name="info"
                  size={40}
                  color={canExecuteAnAction ? '#E7BA40' : '#aaa'}
                />
                <ActionText>Visualizar problemas</ActionText>
              </Action>
              <Action
                onPress={
                  canExecuteAnAction
                    ? () =>
                        navigation.navigate('FinishDelivery', {
                          id: delivery.id,
                        })
                    : () => {}
                }
              >
                <Icon
                  name="check-circle"
                  size={40}
                  color={canExecuteAnAction ? '#7D40E7' : '#aaa'}
                />
                <ActionText>Confirmar entrega</ActionText>
              </Action>
            </ActionsContainer>
          </ColoredContainer.Content>
        </ColoredContainer.ContentWrapper>
      </ColoredContainer.Container>
    </>
  );
}

Details.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      delivery: PropTypes.shape({
        id: PropTypes.number,
        product: PropTypes.string,
        start_date: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.oneOf([null]),
        ]),
        end_date: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.oneOf([null]),
        ]),
        canceled_at: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.oneOf([null]),
        ]),
        recipient: PropTypes.shape({
          name: PropTypes.string,
          street: PropTypes.string,
          city: PropTypes.string,
          state: PropTypes.string,
          cep_code: PropTypes.string,
          house_number: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
};
