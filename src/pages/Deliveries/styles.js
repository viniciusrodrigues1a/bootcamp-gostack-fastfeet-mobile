import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  padding: 10px 40px 0;
`;

export const DeliverymanInfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DeliverymanImage = styled.Image`
  align-self: center;
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const WelcomeContainer = styled.View`
  align-self: center;
  margin-left: 16px;
`;

export const WelcomeText = styled.Text`
  color: #666;
  font-size: 13px;
`;

export const DeliverymanName = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444;
`;

export const FilterDeliveriesContainer = styled.View`
  margin-top: 30px;
  padding-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DeliveriesText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444;
`;

export const FilterOptionContainer = styled.View`
  flex-direction: row;
`;

export const FilterOptionText = styled.Text`
  color: ${props => (props.selected ? '#7D40E7' : '#999')};
  border-bottom-width: ${props => (props.selected ? '2px' : '0')};
  border-bottom-color: #7d40e7;
  font-weight: bold;
`;

export const ActivityIndicatorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const DeliveriesList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;
