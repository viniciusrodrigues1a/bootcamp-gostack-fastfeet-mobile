import styled from 'styled-components/native';

export const CameraView = styled.View`
  height: 350px;
`;

export const CameraButtonsContainer = styled.View`
  flex-direction: row;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const CameraButton = styled.TouchableOpacity`
  background-color: #0000004d;
  padding: 10px;
  border-radius: 100px;
`;

export const SendButton = styled.TouchableOpacity`
  background-color: #7d40e7;
  padding: 16px 0;
`;

export const SendButtonText = styled.Text`
  text-align: center;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
