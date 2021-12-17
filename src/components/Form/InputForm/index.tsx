import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';

import { Input } from '../../../components'

import { Container } from './styles';

type TProps = TextInputProps & {
  control: Control;
  name: string;
}

export const InputForm = (props: TProps) => {
  const { name, control, ...rest } = props;

  return (
    <Container>
      <Controller 
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Input 
            onChangeText={onChange}
            value={value}
            {...rest} 
          />
        )}
      />
    </Container>
  )
};