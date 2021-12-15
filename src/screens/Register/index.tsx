import React from 'react';

import { Input, Button } from '../../components';

import { 
  Container,
  Header,
  Title,
  Form,
  Fields
} from './styles';

export const Register = () => {

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  )
}