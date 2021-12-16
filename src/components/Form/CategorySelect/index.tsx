import React from 'react';

import { Container, Category, Icon } from './styles';

type TProps = {
  title: string;
};

export const CategorySelect = (props: TProps) => {
  const { title } = props;

  return (
    <Container>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  )
};