import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  background-color: #fff;
`;

export const Content = styled.View`
  padding: 40px;
`;

export const Avatar = styled.Image`
  width: 135px;
  height: 135px;
  border-radius: 67.5px;
  align-self: center;
  margin-bottom: 20px;
`;

export const TextProperty = styled.Text`
  color: #666;
  font-size: 14px;
  margin-top: 20px;
`;

export const TextValue = styled.Text`
  color: #444;
  font-size: 22px;
  font-weight: bold;
`;

export const LogoutButton = styled.TouchableOpacity`
  margin-top: 30px;
  background-color: #e74040;
  padding: 16px 0;
  border-radius: 4px;
`;

export const LogoutButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 19px;
  font-weight: bold;
`;
