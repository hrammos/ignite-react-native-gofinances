import React from 'react';

import { Container, Category, Icon } from './styles';

type TProps = {
  title: string;
  onPress: () => void;
};

export const CategorySelectButton = (props: TProps) => {
  const { title, onPress } = props;

  return (
    <Container onPress={onPress}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  )
};