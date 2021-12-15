import React from 'react';
import { TextInputProps } from 'react-native';

import { Container } from './styles';

type TProps = TextInputProps;

export const Input = (props: TProps) => {
  const { ...rest } = props;

  return (
    <Container {...rest} />
  )
};