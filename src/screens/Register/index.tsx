import React, { useState } from 'react';

import { Input, Button, TransactionTypeButton } from '../../components';

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles';

export const Register = () => {
  const [transactionType, setTransactionType] = useState('');

  const handleTransactionTypeSelect = (type: 'up' | 'down') => {
    setTransactionType(type);
  };

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <TransactionsTypes>
            <TransactionTypeButton 
              onPress={() => handleTransactionTypeSelect('up')}
              title="Entrada" 
              type="up"
              isActive={transactionType === 'up'}
            />

            <TransactionTypeButton 
              onPress={() => handleTransactionTypeSelect('down')}
              title="Saída" 
              type="down" 
              isActive={transactionType === 'down'}
            />
          </TransactionsTypes>
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  )
}