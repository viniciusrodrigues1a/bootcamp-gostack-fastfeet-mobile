import styled from 'styled-components/native';

export const ProblemTitle = styled.Text`
  text-align: center;
  color: #fff;
  font-size: 22px;
  font-weight: bold;
`;

export const ProblemDescriptionContainer = styled.View`
  padding: 16px;
`;

export const ProblemDescription = styled.Text`
  color: #666;
  font-size: 14px;
`;

export const ProblemDateContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background: #f5f5f5;
  padding: 8px 16px;
`;

export const ProblemDate = styled.Text`
  color: #888;
  font-size: 14px;
`;
