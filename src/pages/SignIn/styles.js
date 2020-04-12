import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #7d40e7;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.TextInput`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 90%;
  margin: 35px 0 10px;
  padding: 16px;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 90%;
  background-color: #82bf18;
  padding: 16px 0;
  border-radius: 4px;
`;

export const SubmitButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #fff;
`;
