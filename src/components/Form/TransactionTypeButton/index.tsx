import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Icon, Title } from './styles';

type TProps = TouchableOpacityProps & {
  title: string;
  type: 'up' | 'down';
  isActive: boolean;
};

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
}

export const TransactionTypeButton = (props: TProps) => {
  const { title, type, isActive, ...rest } = props;

  return (
    <Container 
      isActive={isActive}
      type={type}
      {...rest} 
    >
      <Icon name={icons[type]} type={type}/>
      <Title>
        {title}
      </Title>
    </Container>
  )
};