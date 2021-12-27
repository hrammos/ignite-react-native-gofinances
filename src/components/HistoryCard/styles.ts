import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

type TContainerProps = {
  color: string;
};

export const Container = styled.View<TContainerProps>`
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  background-color: ${({ theme }) => theme.colors.shape};
  padding: 13px 24px;
  border-radius: 5px;
  border-left-width: 5px;
  border-left-color: ${({ color }) => color};
  margin-bottom: 8px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(15)}px;
`;
