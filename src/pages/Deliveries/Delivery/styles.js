import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  margin: 15px 0 15px;
  border: 1px solid #0000004a;
  border-radius: 4px;
`;

export const DeliveryContent = styled.View`
  padding: 25px;
`;

export const DeliveryTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DeliveryTitleText = styled.Text`
  color: #7d40e7;
  margin-left: 10px;
`;

export const DeliveryProgressContainer = styled.View`
  width: 90%;
  height: 2px;
  background-color: #7d40e7;
  flex-direction: row;
  justify-content: space-between;
  margin: 25px auto 0;
  position: relative;
`;

export const DeliveryProgressBullet = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  margin-top: -8px;
  background-color: ${props => (props.filled ? '#7159c1' : '#fff')};
  ${props =>
    !props.filled &&
    css`
      border: 1px solid #7159c1;
    `};
`;

export const DeliveryProgressTextContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const DeliveryProgressText = styled.Text`
  margin-top: 10px;
  color: #999;
  font-size: 12px;
  width: 30%;
`;

export const DeliveryInfo = styled.View`
  padding: 10px 25px;
  background-color: #f8f9fd;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DeliveryInfoItemContainer = styled.View``;

export const DeliveryInfoItemProperty = styled.Text`
  color: #999;
  font-size: 12px;
`;

export const DeliveryInfoItemValue = styled.Text`
  color: #444;
  font-weight: bold;
  font-size: 13px;
`;

export const MoreDetailsText = styled.Text`
  color: #7d40e7;
  font-weight: bold;
`;
