import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Text } from './styles';

interface IProps extends RectButtonProps {
  title: string
  onPress: () => void;
};

export const Button = (props: IProps) => {
  const { title, onPress, ...rest } = props;

  return (
    <Container onPress={onPress} {...rest}>
      <Text>{title}</Text>
    </Container>
  )
};