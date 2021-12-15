import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Text } from './styles';

type TProps = TouchableOpacityProps & {
  title: string
};

export const Button = (props: TProps) => {
  const { title, ...rest } = props;

  return (
    <Container {...rest}>
      <Text>{title}</Text>
    </Container>
  )
};