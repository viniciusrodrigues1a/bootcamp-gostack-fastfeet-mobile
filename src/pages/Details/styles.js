import styled from 'styled-components/native';

export const Title = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TitleText = styled.Text`
  color: #7d40e7;
  font-weight: bold;
  font-size: 16px;
  margin-left: 8px;
`;

export const Property = styled.Text`
  color: #999;
  text-transform: uppercase;
  font-size: 14px;
  margin-top: 15px;
`;

export const Value = styled.Text`
  color: #555;
  font-size: 15px;
  margin-top: 2px;
`;

export const FlexContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ActionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Action = styled.TouchableOpacity`
  width: 33.3%;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
`;

export const ActionText = styled.Text`
  color: #999;
  text-align: center;
`;
