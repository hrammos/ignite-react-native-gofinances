import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: flex-end;

  width: 100%;
  height: 70%;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const TitleWrapper = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(30)}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.shape};
  margin-top: ${RFValue(45)}px;
`;

export const SignInTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.shape};
  margin-top: ${RFValue(80)}px;
  margin-bottom: ${RFValue(67)}px;
`;

export const Footer = styled.View`
  width: 100%;
  height: 30%;
  background-color: ${({ theme }) => theme.colors.secondary};
`;
