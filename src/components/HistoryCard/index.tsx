import React from 'react';

import { Container, Title, Amount } from './styles';

type TProps = {
  color: string;
  title: string;
  amount: string;
};

export const HistoryCard = (props: TProps) => {
  const { color, title, amount } = props;

  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  )
};