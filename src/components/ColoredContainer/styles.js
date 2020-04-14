import styled from 'styled-components/native';

export const StyledColoredContainer = styled.View`
  width: 100%;
  height: 80px;
  background-color: #7d40e7;
`;

export const StyledContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  background-color: #fff;
`;

export const StyledContentWrapper = styled.View`
  margin: -65px 20px 0;
`;

export const StyledContent = styled.View`
  margin: 10px 0;
  padding: 16px;
  background: #fff;
  border: 1px solid #aaa;
  border-radius: 4px;
`;
